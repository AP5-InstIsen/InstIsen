<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function store(Request $request)
    {
        if ($request->hasFile('image')) {
            //  Let's do everything here
            if ($request->file('image')->isValid()) {
                //
                $validated = $request->validate([
                    'name' => 'string|max:255',
                    'image' => 'mimes:jpeg,png|max:15360',
                ]);
                $path = $request->image->store('images');
                $image = Image::create([
                    'path' => $path
                ]);

                return response(['image' => $image, 'message' => 'image was uploaded successfully']);

                //return response(['image' => $request, 'message' => 'image was uploaded successfully']);
            }
        }
        return response(['message' => 'wrong file']);
    }

    /*public function viewUploads()
    {
        $images = File::all();
        return view('view_uploads')->with('images', $images);
    }*/
}
