<?php

namespace App\Http\Controllers;

use App\Models\UserComment;
use Auth;
use Illuminate\Http\Request;

class UserCommentController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::guard('api')->user();
        $request->validate([
                    'idImage' => 'required|integer',
                    'comment' => 'required|string|max:255',
                ]);

        $userComment = UserComment::create([
                        'idUser' => $user->id,
                        'idImage' => $request->idImage,
                        'comment' => $request->comment
                    ]);


        return response(['userComment' => $userComment,'message' => 'the comment was updated successfully']);
    }
}
