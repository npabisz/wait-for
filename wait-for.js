function waitFor(objectName, callback)
{
	var checkVar = function(context, objName)
	{
		if ('undefined' === typeof(context[objName[0]])) {
			return false;
		}
		
		if (objName.length > 1) {
			return checkVar(context[objName[0]], objName.slice(1));
		}
		
		return true;
	};
	
	var objectNotFound = false;
	
	if ('string' === typeof(objectName)) {
		objectNotFound = !checkVar(window, objectName.split('.'));
	}
	
	if ('object' === typeof(objectName)) {
		for (var i = 0; i < objectName.length; i++) {
			if (!checkVar(window, objectName[i].split('.'))) {
				objectNotFound = true;
			}
		}
	}
	
	if (objectNotFound) {
		return setTimeout(function () {
			waitFor(objectName, callback);
		}, 10);
	}
		
	if ('function' === typeof(callback)) {
		callback();
	}
}