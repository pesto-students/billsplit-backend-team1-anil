
const sdebt = ()=>{
    const member = ["aditya","durgesh","swapnil","dipak"]
    const arr = [[0,0,0,0],[0,0,0,20],[10,10,0,0],[20,0,10,0]]
    let res=[]
    
    const mincompare=(x,y)=>{
        return x > y ? y : x;
    }
    const total=(arr)=>{
        let newarr= Array(arr.length).fill(0);
        for(let i=0;i<arr.length;i++){
            for(let j=0;j<arr.length;j++){
                newarr[i] += (arr[j][i] - arr[i][j])
            }
        }
        return newarr;
    }
    const max=(arr)=>{
        let max=0;
        for(let i in arr){
            if(arr[max]<arr[i]) max = i
        }
        return max;
    }
    const min=(arr)=>{
        let min=0;
        for(let i in arr){
            if(arr[min]>arr[i]) min = i
        }
        return min;
    }
    const minConnection=(arr,res)=>{
        minIndex = min(arr);
        maxIndex = max(arr);
        if(arr[maxIndex]===0 && arr[minIndex]===0) return;
        let minValue = mincompare(-arr[minIndex],arr[maxIndex]);
        arr[minIndex] += minValue;
        arr[maxIndex] -= minValue;
        res.push([minIndex,maxIndex,minValue])
        return minConnection(arr,res);
    }

    minConnection(total(arr),res);

    // for(let i in res){
    //     console.log(`${member[res[i][0]]} gives ${member[res[i][1]]} ${res[i][2]} rupees`);
    // }
    return res;
}
const res = sdebt();
module.exports = res;
