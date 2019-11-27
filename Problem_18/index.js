const fs = require('fs');
if(process.argv.length < 3)
{
    console.log('Provide a file:');
    fs.readdirSync('./data').forEach( (file) => console.log(file));
    process.exit();
}
const rawData = require(`./data/${process.argv[2]}`);

let rowNumber = 0;
let path = [];
let index = 0;

let decorativeMaxValue = 0;

const getValueAt = function(rowIndex, colIndex)
{
    if(rawData[rowIndex] && rawData[rowIndex][colIndex])
    {
        return rawData[rowIndex][colIndex];
        
    }
    return 0;
}

while( rowNumber < rawData.length )
{
    if(decorativeMaxValue < Math.max(rawData[rowNumber]))
    {
        decorativeMaxValue = Math.max(rawData[rowNumber]);
    }
    path[rowNumber] = index;
    
    let currentValue = getValueAt(rowNumber, index);
    let leftPath = currentValue + getValueAt(rowNumber+1, index) + Math.max(getValueAt(rowNumber+2, index), getValueAt(rowNumber+2, index+1));
    let rightPath = currentValue + getValueAt(rowNumber+1, index+1) + Math.max(getValueAt(rowNumber+2, index+1), getValueAt(rowNumber+2, index+2));
    
    if( leftPath < rightPath)
    {
        index+=1;
    }

    rowNumber++;
}

console.log("------------------ Path --------------------------------------");
let lastLength = rawData[rawData.length-1].length;
let result = 0;
let output = '';
rawData.forEach( (row, rowIndex) => {
    let str = '';
    let colPad = Math.floor( (lastLength - row.length));
    if( colPad > 0)
    {
        str = str.padStart(colPad*decorativeMaxValue.toString().length, ' ')
    }

    row.forEach( (col, colIndex) => {
        let l = decorativeMaxValue.toString().length - col.toString().length;
        
        let displayVal = col.toString();
        if( l > 0)
        {
            displayVal = displayVal.padStart(l+1, ' ');
        }
        if( colIndex === path[rowIndex ])
        {
            str+= `[${displayVal}]`;
            
        }else{
            str+= ` ${displayVal} `;
        }

        if( path[rowIndex] === colIndex )
        {
            result+= row[colIndex];
        }

        
    });
    output+= str+'\n';
});
console.log(output);
console.log("--------------------------------------------------------------");
console.log("Result:", result);