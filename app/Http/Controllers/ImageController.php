<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function store(Request $request)
    {
        if ($request->hasFile('image')) {
            if ($request->file('image')->isValid()) {
                //
                if (Auth::guard('api')->check()) {
                    $user = Auth::guard('api')->user();
                    $validated = $request->validate([
                    'name' => 'string|max:255',
                    'image' => 'mimes:jpeg,png|max:15360',
                    ]);
                    $path = $request->image->store('images');
                    $image = Image::create([
                        'path' => $path,
                        'idUser' => $user->id,
                        'exifs' => false
                    ]);

                    return response(['image' => $image, 'message' => 'image was uploaded successfully']);
                } else {
                    return response(['message' => 'you are not logged in']);
                }
            }
        }
        return response(['message' => 'wrong file']);
    }

    /* public function get(Request $request){
        return response()->file($pathToFile);
    } */

    /*public function viewUploads()
    {
        $images = File::all();
        return view('view_uploads')->with('images', $images);
    }*/
}
