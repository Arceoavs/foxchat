<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;


class ChatFoxdoxUserTest extends TestCase
{
    /** @test */
    public function sendMessageFoxdoxUser()
    {
        $user = User::where('name', 'neuhaus')->first();
        $this->actingAs($user, 'api');
        $data = [
            "receivingprovider" => "meine.versicherung",
            "message" => "Hello",
            "conversationtag" => "Allgemein"
        ];
        $response = $this->json('POST', '/api/chat/user/sendmessage', $data);
        $response->assertStatus(201);
        $response->assertJsonStructure([
            "message",
            "conversation_id",
            "conversation_tag",
            "user_id",
            "is_seen",
            "updated_at",
            "created_at",
            "id",
            "conversation" =>[
              "id",
              "user_one",
              "user_two",
              "tag",
              "created_at",
              "updated_at"
            ]
        ]);
    }

    public function sendMessageWithOutBodyFoxdoxUser()
    {
        $user = User::where('name', 'neuhaus')->first();
        $this->actingAs($user, 'api');
        $data = [

        ];
        $response = $this->json('POST', '/api/chat/user/sendmessage', $data);
        $response->assertStatus(400);
    }

    public function sendMessageFoxdoxUserAsProvider()
    {
        $user = User::where('name', 'meine.versicherung')->first();
        $this->actingAs($user, 'api');
        $data = [
            "receivingprovider" => "meine.versicherung",
            "message" => "Hello",
            "conversationtag" => "Allgemein"
        ];
        $response = $this->json('POST', '/api/chat/user/sendmessage', $data);
        $response->assertStatus(400);
        $response->assertJsonStructure([
            "errors" => [
                "status" => "400",
                "message" => "You are not a Foxdox User."
            ]
        ]);
    }
}
