<h1>Simple Blog</h1>
I was reviewing the basics of programming and decided to make a simple Blog.
There's only a part of the code here, you need to put the dependencies yourself, but I'll walk you through it step by step on how to put it
<h2>Dependencies</h2>
<h3>Installation Jquery </h3>
Just go on https://code.jquery.com/jquery-3.6.0.min.js ctrl+a and ctrl+c to copy it all then create jquery.js on the main folder past it in there

<h3>Installation bootstrap</h3>
To inclued bootstrap you can put call the css and js through the link href and script src:

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <title>Blog</title>
  </head>
  <body>

    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
  </body>
</html>
```

or you can download the folder with the css and js
Straight form the site: https://getbootstrap.com/docs/4.1/getting-started/download/ 
Download it here: https://github.com/twbs/bootstrap/releases/download/v4.1.3/bootstrap-4.1.3-dist.zip 
unzip the file and name it just bootstrap.


<h3>setting up Firebase</h3>
Just follow firestores instructions: 
https://firebase.google.com/docs/firestore

```javascript
const firebaseConfig = {
 //put your firebase api key in here
};
```

<h2>Setting up the preview link</h2>
The preview link I got from this repository, it has a step by step on how to use it but I'll put on here too just in case: 
https://github.com/kasp3r/link-preview - Copyright (c) 2013 Tadas Juozapaitis <kasp3rito@gmail.com>

go on your brouwser and put http://getcomposer.org/composer.phar to download.
Then run

```bash
$ php composer.phar install
```

Library will be installed in vendor/kasp3r/link-preview

In your project include composer autoload file from vendor/autoload.php