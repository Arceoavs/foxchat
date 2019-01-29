<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;

class LoginTest extends TestCase
{
    /** @test */
    public function falseLoginUser()
    {
        $data = [
            'name' => 'neuhaus',
            'password' => '1234'
        ];

        $response = $this->json('POST', '/api/auth/login',$data);
        $response->assertStatus(401);
    }

    /** @test */
    public function correctLoginUser()
    {
        $data = [
            'name' => 'neuhaus',
            'password' => 'romqaq-5vawxo-fummoD'
        ];

        $response = $this->json('POST', '/api/auth/login',$data);
        $response->assertStatus(200);
        $response->assertJsonStructure([
            "access_token",
            "isProvider",
            "token_type",
            "expires_in"
        ]);
    }

    /** @test */
    public function falseLoginProvider()
    {
        $data = [
            "name" => "meine.vesicherung",
            "password" => "meine.versicherung",
            "x-provider" => "HwCuYqDaadmXGMObfLYP"    
        ];

        $response = $this->json('POST', '/api/auth/provider/login',$data);
        $response->assertStatus(401);
    }

        /** @test */
        public function correctLoginProvider()
        {
            $data = [
                "name" => "meine.versicherung",
                "password" => "meine.versicherung",
                "x-provider" => "HwCuYqDaadmXGMObfLYP"    
            ];
    
            $response = $this->json('POST', '/api/auth/provider/login',$data);
            $response->assertStatus(200);
            $response->assertJsonStructure([
                "access_token",
                "isProvider",
                "token_type",
                "expires_in"
            ]);
        }

    /** @test */
    public function meUser()
    {
        $user = User::where('name', 'neuhaus')->first();
        $this->actingAs($user, 'api');
        $response = $this->json('GET', '/api/auth/me');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            "id",
            "isProvider",
            "name",
            "foxdox_token",
            "created_at",
            "updated_at"
        ]);
    }

}
