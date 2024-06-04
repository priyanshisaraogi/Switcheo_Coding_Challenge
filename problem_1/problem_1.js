function sum1(n) {
    let count=0
    for (let i=0; i<n+1; i++){
        count+=i;
    }
    return count
};

function sum2(n){
    let count=0
    if (n===0){
        return n
    }
    else{
        count=n+sum2(n-1);
    }
    return count;
}

function sum3(n){
    const sum =(1+n)*(n/2);
    return sum;
}
