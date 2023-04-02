
# llcacodec Changelog

# April 1, 2023

Changed all functions with "PlainText" in the name to "Plaintext" instead

Completely removed the concept of "Byte Arrays" and the functions byteArrayToASCII and pushASCIIBytes. Instead, strings are build by simply using an array of strings that are joined upon return

Changed name to just be llcacodec from llcacodec.js

Added RLE File Writing

## March 30, 2023

Removed public api function readLifeFileLiveCoordinates. Now all file types return coordinates, and they can be read through readLifeFile(string, format).liveCoordinates

Added public function isLifeStringFormat to check if a string conforms with a specific file format

Changed all decoded data to return the name of its format along with itself

Changed all encoding data interfaces to require the name of its format along with itself

Changed all decoded data interfaces to match the pattern (FILE_TYPE_NAME)DecodedData

Changed all encoding data interfaces to match the pattern (FILE_TYPE_NAME)EncodingData

Changed readLifeFile overload for unknown file types to not accept a second parameter

Changed RLEDecodedData to default topleft to [0, 0] and include a new field "foundTopLeft" for if a custom top left coordinate was found