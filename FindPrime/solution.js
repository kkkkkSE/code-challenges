function checkPrime(num) {
    if(num < 2) return false;

    for(let i = 2; i <= Math.sqrt(num); i++){
      if(num % i === 0){
        return false;
      }
    }
    return true;
}

function helper(set, str, visitArr, numbers, len){
    for(let i = 0; i < numbers.length; i++){
        if(visitArr[i]) continue;
        visitArr[i] = true;
        set.add(str + numbers[i]);
        helper(set, str + numbers[i], visitArr, numbers, len);
        visitArr[i] = false;
    }
}

function solution(numbers) {
    const set = new Set();
    const len = numbers.length;
    const visited = new Array(len).fill(false);
    const answer = new Set();

    helper(set, '', visited, numbers, len);

    for(let el of set){
        if(checkPrime(el)) answer.add(Number(el));
    }
    return answer.size;
}