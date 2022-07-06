<?php
include './vendor/autoload.php';

use LinkPreview\LinkPreview;
use LinkPreview\Model\VideoLink;

$linkPreview = new LinkPreview($_POST["lastUrl"]);
$parsed = $linkPreview->getParsed();
foreach ($parsed as $parserName => $link) {
    $videoId = "";
    $embedCode = "";
//if our link contains embed code
    if ($link instanceof VideoLink) {
        // get out video id
        $videoId = $link->getVideoId();
        //get out embed code
        $embedCode = $link->getEmbedCode();
    }

    $siteInfo = (object)[
        'title' => $link->getTitle(),
        'description' => $link->getDescription(),
        'image' => $link->getImage(),
        'videoId' => $videoId,
        'embedCode' => $embedCode,
        'url' => $link->getUrl(),
    ];
//echo $parserName . PHP_EOL . PHP_EOL;
//echo $link->getUrl() . PHP_EOL;
//echo $link->getRealUrl() . PHP_EOL;
//echo $link->getTitle() . PHP_EOL;
//echo $link->getDescription() . PHP_EOL;
//echo $link->getImage() . PHP_EOL;
//print_r($link->getPictures());

echo json_encode($siteInfo);
}
?>