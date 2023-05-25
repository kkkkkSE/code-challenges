function factorial (n, res = 1) {
    if(n <= 1) return res * 1;

    return factorial(n-1, res * n);
}

function solution(n, k) {
    const arr = new Array(n+1).fill().map((_,i) => i);
    const answer = [];

    for(let i = 1; i <= n; i++){
        const fn = factorial(n-i);
        const num = Math.ceil(k / fn);
        
        k = k % fn !== 0 ? k % fn : fn;

        answer.push(arr[num]);
        arr.splice(num,1);
    }
    return answer;
}
// 우선 0~n까지의 배열 만들기. => 인덱스와 원소 숫자가 동일하게, 0번은 안씀
// 첫번째 숫자 = Math.ceil(k / (n-1)!) -> k = k % (n-1)! -> k가 0이면 (n-1)!로 바꿈(밑에 예시)
// -> 0~n 배열에서 첫번째 숫자 지우고, answer.push(첫번째숫자)
// 두번째 숫자 = Math.ceil(k / (n-2)!) -> k = k % (n-2)!
// -> 0~n 배열에서 두번째 숫자 지우고, answer.push(두번째숫자)
// ... n번째 숫자까지 진행

// ex) n = 4일 때,

// 3,1,2,4 k=13, k = k % (n-1)! = 1
// 3,1,4,2 k=14, k = k % (n-1)! = 2
// 3,2,1,4 k=15, k = k % (n-1)! = 3
// 3,2,4,1 k=16, k = k % (n-1)! = 4
// 3,4,1,2 k=17, k = k % (n-1)! = 5
// 3,4,2,1 k=18, k = k % (n-1)! = 0 => 6이 되어야 함
// 4,1,2,3
// 4,1,3,2

