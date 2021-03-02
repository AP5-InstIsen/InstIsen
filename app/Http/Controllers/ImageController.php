<?php

namespace App\Http\Controllers;

use App\Models\BroadcastList;
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
                $user = Auth::guard('api')->user();
                $validated = $request->validate([
                    'name' => 'string|max:255',
                    'image' => 'mimes:jpeg,png|max:15360',
                    'id_broadcast_list' => 'integer',
                    'legend' => 'string'
                    ]);
                $path = $request->image->store('images');
                $image = Image::create([
                        'path' => $path,
                        'idUser' => $user->id,
                        'idBroadcastList' => $request->id_broadcast_list,
                        'legend' => $request->legend,
                        'exifs' => false
                    ]);

                return response(['image' => $image, 'message' => 'image was uploaded successfully']);
            }
        }
        return response(['message' => 'wrong file']);
    }

    public function getImageInfoById(Request $request)
    {
        $image = Image::find($request->id);
        return response(['image' => $image]);
    }

    public function getImagesInfo(Request $request)
    {
        $user = Auth::guard('api')->user();
        $images_list = Image::where('idUser', $user->id)->get();
        return response(['images_list' => $images_list]);
    }

    public function getImageById(Request $request)
    {
        $image = Image::find($request->id);
        return response()->file(storage_path('app/').$image->path);
    }

    public function getImageByPath(Request $request)
    {
        return response()->file(storage_path('app/').$request->path);
    }

    public function getWall(Request $request)
    {
        $user = Auth::guard('api')->user();
        $broadcast_lists = BroadcastList::where('broadcast', 'like', '%'.$user->id.'%')->get('id')->toArray();
        $broadcast_lists_ids = array();
        foreach ($broadcast_lists as $blist) {
            array_push($broadcast_lists_ids, $blist['id']);
        }
        $images = Image::whereIn('idBroadcastList', $broadcast_lists_ids)->get();

        return response(['images_list' => $images]);
    }
    /*public function viewUploads()
    {
        $images = File::all();
        return view('view_uploads')->with('images', $images);
    }*/
}
