<?php
	
	$padding = 0;
    $order   = 1;
    $gtype   = 1;
    $lon     = -73.91353;
    $lat     = 42.80611;

    $bindata = pack('LcLd2', $padding, $order, $gtype, $lat, $lon);

    printf("Packed: %s\n\n", bin2hex($bindata));

    $result = unpack('Lpadding/corder/Lgtype/dlatitude/dlongitude', $bindata);
    var_dump($result);