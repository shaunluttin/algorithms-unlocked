function insertionSort(array)
{
	for(var i = 1; i < array.length; ++i)
	{
		var currentItem = array[i];
	
		for(var j = i - 1; j >= 0; --j)
		{
			if(array[j] <= currentItem) break;
			array[j + 1] = array[j];
		}
		
		array[j + 1] = currentItem;
	}
	
	return array;
}

//test
var initialArray = [ 2, 4, 6, 8, 0, 5, 2, 5, 7, 8, 4, 7, 9 ];
var solutionArray = [ 0, 2, 2, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9 ];

var sortedArray = insertionSort(initialArray);

var passed = JSON.stringify(sortedArray)==JSON.stringify(solutionArray);
console.log('passed:' + passed);