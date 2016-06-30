function quickSort(array, firstIndex, lastIndex)
{
	if(firstIndex >= lastIndex) return;
	
	var firstIndexOfTheRightGroup = partition(array, firstIndex, lastIndex);
	
	quickSort(array, firstIndex, firstIndexOfTheRightGroup - 1);
	quickSort(array, firstIndexOfTheRightGroup + 1, lastIndex);
	
	return array;
}

function partition(array, firstIndex, lastIndex)
{
	var lastItem = array[lastIndex];
	
	var firstIndexOfTheRightGroup = firstIndex;
	var firstItemInTheRightGroup;
	
	for(var currentIndex = firstIndex; currentIndex < lastIndex; ++currentIndex)
	{
		var currentItem = array[currentIndex];

		if(currentItem <= lastItem)
		{
			firstItemInTheRightGroup = array[firstIndexOfTheRightGroup];
			
			array[firstIndexOfTheRightGroup] = currentItem;
			array[currentIndex] = firstItemInTheRightGroup;
			
			++firstIndexOfTheRightGroup;
		}
	}
	
	firstItemInTheRightGroup = array[firstIndexOfTheRightGroup];
	
	array[firstIndexOfTheRightGroup] = lastItem;
	array[lastIndex] = firstItemInTheRightGroup;
	
	return firstIndexOfTheRightGroup;
}

//test
var initialArray = [ 2, 4, 6, 8, 0, 5, 2, 5, 7, 8, 4, 7, 9 ];
var solutionArray = [ 0, 2, 2, 4, 4, 5, 5, 6, 7, 7, 8, 8, 9 ];

var sortedArray = quickSort(initialArray, 0, initialArray.length - 1);

var passed = JSON.stringify(sortedArray)==JSON.stringify(solutionArray);
console.log('passed:' + passed);