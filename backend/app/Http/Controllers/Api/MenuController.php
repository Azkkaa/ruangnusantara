<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MenuRequest;
use App\Models\Category;
use App\Models\Menu;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Storage;

class MenuController extends Controller
{
    public function index ()
    {
        try {
            $menus = Menu::with('categories')->get();

            return response()->json([
                'success' => true,
                'message' => 'Getting menu list',
                'resources' => $menus
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "Internal Server Error!!",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store (MenuRequest $request)
    {
        try {
            $data = $request->validated();
            $categoryId = Category::where('slug', '=', $request->category_slug)->first()->id;

            if ($request->hasFile('image')) {
                $data['image_url'] = $request->file('image')->store('menus', 'public');
            }

            $menu = Menu::create([
                'name' => $data['name'],
                'price' => $data['price'],
                'image_url' => $data['image_url']
            ]);

            // Many-To-Many relation, but 1 category
            $menu->categories()->sync([$categoryId]);

            return response()->json([
                'success' => true,
                'message' => 'Menu berhasil ditambahkan!',
                'data' => $menu
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "Internal Server Error!!",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(MenuRequest $request, $id)
    {
        try {
            $menu = Menu::findOrFail($id);
            $categoryId = Category::where('slug', '=', $request->category_slug)->first()->id;
            $data = $request->validated();

            if ($request->hasFile('image')) {
                // Delete old photo if exist
                if ($menu->image) {
                    Storage::disk('public')->delete($menu->image);
                }
                $data['image'] = $request->file('image')->store('menus', 'public');
            }

            $menu->update($data);

            $menu->categories()->sync([$categoryId]);

            return response()->json([
                'success' => true,
                'message' => 'Menu berhasil diperbarui!'
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Menu item tidak ditemukan!!'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "Internal Server Error!!",
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $menu = Menu::findOrFail($id);

            if ($menu->image) {
                Storage::disk('public')->delete($menu->image);
            }

            $menu->categories()->detach();
            $menu->delete();

            return response()->json([
                'message' => 'Menu berhasil dihapus!',
                'success' => true
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Menu item tidak ditemukan!!'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => "Internal Server Error!!",
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
