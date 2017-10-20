function waitFor(objectName, callback)
{
	var checkVar = function(objName)
	{
		if ('undefined' === typeof(window[objName[0]])) {
			return false;
		}
		
		if (objName.length > 1) {
			return checkVar(window[objName[0]], objName.slice(1));
		}
		
		return true;
	};
	
	var objectFound = false;
	
	if ('string' === typeof(objectName)) {
		objectFound = checkVar(objectName.split('.'));
	}
	
	if ('object' === typeof(objectName)) {
		for (var i = 0; i < objectName.length; i++) {
			if (checkVar(objectName[i].split('.'))) {
				objectFound = true;
			}
		}
	}
	
	if (!objectFound) {
		return setTimeout( function(){
			waitFor(objectName, callback);
		}, 10 );
	}
		
	if ('function' === typeof(callback)) {
		callback();
	}
}