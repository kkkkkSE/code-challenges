function solution(num) {
    const answer = [];

    function hanoi(n, start, hub, end){
        if(n <= 1) {
            answer.push([start, end]);
            return;
        }

        hanoi(n-1, start, end, hub);
        answer.push([start, end]);
        hanoi(n-1, hub, start, end);
    }

    hanoi(num, 1, 2, 3);

    return answer;
}

// 하노이의 탑 너무 어렵다... 레벨 2라고 했는데 내 생각엔 3정도 되는 것 같다..
// 아무리 생각해도 해답을 찾지 못해 해설을 찾아봤다. 내가 이해한 바로는 이렇다.

// 예시 - 4개의 원판을 A->C로 옮겨라 !
// 4개의 원판을 A -> C로 옮기기 위해서는 우선
// 1) 1번 ~ 3번 원판을 A->B로 먼저 옮기고,
// 2) 4번 원판을 A->C로 옮긴다음
// 3) 1번 ~ 3번 원판을 B->C로 다시 옮긴다.

// 옮기는 과정을 담은 함수가 hanoi(n, start, hub, end) 라고 한다면
// 1) hanoi(3, A, C, B);
// 2) answer.push([A, C]);
// 3) hanoi(3, B, A, C);
// 로 정의할 수 있다.

// 그럼 hanoi(3, A, C, B) 는 뭘까? 3개의 원판을 A->B 로 옮긴다는 것이고, 과정은 다음과 같을 것이다.
// 1) 1번 ~ 2번 원판을 A->C로 먼저 옮기고,
// 2) 3번 원판을 A->B로 옮긴 다음
// 3) 1번 ~ 2번 원판을 C->B로 다시 옮긴다.

// 1) hanoi(2, A, B, C);
// 2) answer.push([A, B]);
// 3) hanoi(2, C, A, B);

// 이로써 재귀 함수를 완성할 수 있게 됐다.

// function hanoi(n, start, hub, end){
//     hanoi(n-1, start, end, hub);
//     answer.push([start, end]);
//     hanoi(n-1, hub, start, end);
// }

// 예외 처리도 해주면 끝난다. 타고 가다보면 결국 n이 1이 되는 경우가 있다.
// 1일 때는 그냥 hub 를 거칠 필요 없이 start -> end로 이동시키면 된다.

// function hanoi(n, start, hub, end){
//     if(n <= 1) {
//         answer.push([start, end]);
//         return
//     }
//
//     hanoi(n-1, start, end, hub);
//     answer.push([start, end]);
//     hanoi(n-1, hub, start, hub);
// }