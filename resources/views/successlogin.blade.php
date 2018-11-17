@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <h1>Herzlich Willkommen im digitalen Tresor, <?php echo $name; ?>! </h1><br><br>
                    Dein aktuelles foxdox Token ist: <?php echo $foxtoken ?>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
