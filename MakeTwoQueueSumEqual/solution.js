function solution(queue1, queue2) {
    const len1 = queue1.length, len2 = queue2.length;
    let sum1 = queue1.reduce((a,c) => a+c);
    let sum2 = queue2.reduce((a,c) => a+c);
    let i1 = 0, i2 = 0;
    let answer = 0;

    if((sum1 + sum2) % 2) return -1;

    while(sum1 !== sum2 && answer++ < 2 * (len1 + len2)){
        if(sum1 < sum2){
            sum1 += queue2[i2];
            sum2 -= queue2[i2];
            queue1.push(queue2[i2]);
            i2++;
        }
        else {
            sum1 -= queue1[i1];
            sum2 += queue1[i1];
            queue2.push(queue1[i1]);
            i1++;
        }
    }

    return answer < 2 * (len1 + len2) ? answer : -1;
}

// 예외처리
// 두 큐의 합의 합이 홀수면 return -1
// 두 큐의 원소의 개수 합만큼 돌았는데 답이 안나왔을 때, return -1

// 큐의 앞 요소를 잘라내는데 비용이 많이 드니까 push만 하고 index를 조정해보자.

// 반례 : [3, 3, 3, 3] [3, 3, 21, 3] 은 
// 두 큐의 원소의 개수 합보다 더 많은 원소의 이동을 요구한다.
// -> while문 반복 횟수 제한을 늘려 해결