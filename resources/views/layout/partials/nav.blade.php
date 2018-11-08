<style>
.nav-item::after{content:'';display:block;width:0px;height:4px;background:#EB5D39;transition: 0.15s;}
.nav-item:hover::after{width:100%;}
</style>

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href=".">
        <img style='height:25px' alt="Brand" src="{{ asset('img/logo.png') }}">
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="nav-item">
          <a href="/dokumente">Dokumente <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a href="/chats">Chats <span class="sr-only">(current)</span></a>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>