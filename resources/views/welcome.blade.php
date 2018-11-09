@extends('layout.default')

@section('content')

<div class="container">
        <div class="row justify-content-md-center">
            <div class="col-md-3">
                <form class="form-signin">
                        <h1 class="h3 mb-3 font-weight-normal">Login</h1>
                        <label for="username" class="sr-only">Foxdox Benutzername</label>
                        <input type="username" id="username" class="form-control" placeholder="Foxdox Benutzername" required autofocus></input>
                        <label for="inputPassword" class="sr-only">Passwort</label>
                        <input type="password" id="inputPassword" class="form-control" placeholder="Passwort" required>
                        <div class="checkbox mb-3">
                         
                        </div>
                        <button class="btn btn-primary btn-md" type="submit">Anmelden</button>
                    </form>
            </div>
            <div class="col-md-4">
                <div class="content">
                        <div class="title">
                            Hallo
                        </div>
            
                        <div class="links">
                            <a href="/dokumente"> Willkommen im digitalen Tresor</a>
                        </div>
                </div>
          </div>
        </div>
</div>
@endsection