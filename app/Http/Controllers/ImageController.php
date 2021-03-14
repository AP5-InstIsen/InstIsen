<?php

namespace App\Http\Controllers;

use App\Models\BroadcastList;
use App\Models\Image;
use App\Models\Tag;
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
                    'legend' => 'string',
                    'tags' => 'string'
                    ]);
                $path = $request->image->store('public');
                $image = Image::create([
                        'path' => $path,
                        'idUser' => $user->id,
                        'idBroadcastList' => $request->id_broadcast_list,
                        'legend' => $request->legend,
                        'exifs' => false
                    ]);
                $tagsInDB = array();
                if ($request->tags != '') {
                    foreach (explode(',', $request->tags) as $tag) {
                        $newTag = Tag::create([
                            'idImage' => $image->id,
                            'name' => $tag
                        ]);
                        array_push($tagsInDB, $newTag);
                    }
                }

                return response(['image' => $image, 'tags' => $tagsInDB, 'message' => 'image was uploaded successfully']);
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

    public function getBroadcastListIds($broadcast_lists)
    {
        $broadcast_lists_ids = array();
        foreach ($broadcast_lists as $blist) {
            array_push($broadcast_lists_ids, $blist['id']);
        }
        return $broadcast_lists_ids;
    }

    public function getTagsString($imageId)
    {
        $tags = Tag::where("idImage", $imageId)->get();
        $tagsString = '';
        foreach ($tags as $tag) {
            if ($tagsString == '') {
                $tagsString = $tag->name;
            } else {
                $tagsString = $tagsString . "," . $tag->name;
            }
        }
        return $tagsString;
    }

    public function getImagesList($image_list_db)
    {
        $images_list = array();
        foreach ($image_list_db as $image) {
            $tagsString = $this->getTagsString($image->id);
            $newImage = array(
                'id' => $image->id,
                'path' => asset(Storage::url($image->path)),
                'idUser' => $image->idUser,
                'idBroadcastList' => $image->idBroadcastList,
                'legend' => $image->legend,
                'note' => $image->note,
                'tags' => $tagsString,
                'exifs' => $image->exifs,
                'created_at' => $image->created_at,
                'updated_at' => $image->updated_at,
            );
            array_push($images_list, $newImage);
        }
        return $images_list;
    }

    public function getImagesListByTag($images_list, $tag)
    {
        $images_list_joined = array();
        foreach ($images_list as $image) {
            $imageTags = Tag::where('idImage', $image->id)->get();
            $isHere = false;
            foreach ($imageTags as $imageTag) {
                if ($imageTag->name == $tag) {
                    $isHere = true;
                    break;
                }
            }
            if ($isHere == true) {
                array_push($images_list_joined, $image);
            }
        }
        return $images_list_joined;
    }

    public function getWall(Request $request)
    {
        $user = Auth::guard('api')->user();
        $broadcast_lists_ids = $this->getBroadcastListIds(BroadcastList::where('broadcast', 'like', '%'.$user->id.'%')->get('id')->toArray());
        $images_list = $this->getImagesList(Image::whereIn('idBroadcastList', $broadcast_lists_ids)->get());

        return response(['images_list' => $images_list]);
    }

    public function searchByTag(Request $request)
    {
        $user = Auth::guard('api')->user();
        $broadcast_lists_ids = $this->getBroadcastListIds(BroadcastList::where('broadcast', 'like', '%'.$user->id.'%')->get('id')->toArray());
        $images_list_joined = $this->getImagesListByTag(Image::whereIn('idBroadcastList', $broadcast_lists_ids)->get(), $request->tag);
        $images_list = $this->getImagesList($images_list_joined, $request->tag);

        return response(['images_list' => $images_list]);
    }
}
