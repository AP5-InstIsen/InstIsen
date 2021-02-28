<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUsersList(Request $request)
    {
        $users = User::select('id', 'email')->get();
        return response(['users' => $users]);
    }
}
