<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\BroadcastListController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\UserCommentController;
use App\Http\Controllers\UserNoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('isAuthenticated')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/upload', [ImageController::class, 'store']);
    Route::post('/create_broadcast_list', [BroadcastListController::class, 'store']);
    Route::post('/get_broadcast_list_by_id', [BroadcastListController::class, 'getBroadcastListById']);
    Route::post('/get_broadcast_list_by_user_id', [BroadcastListController::class, 'getBroadcastListByUserId']);
    Route::post('/get_image_by_id', [ImageController::class, 'getImageById']);
    Route::post('/get_image_by_path', [ImageController::class, 'getImageByPath']);
    Route::post('/get_image_info_by_id', [ImageController::class, 'getImageInfoById']);
    Route::post('/get_images_list', [ImageController::class, 'getImagesInfo']);
    Route::post('/get_wall', [ImageController::class, 'getWall']);
    Route::post('/create_user_note', [UserNoteController::class, 'store']);
    Route::post('/create_user_comment', [UserCommentController::class, 'store']);
});
