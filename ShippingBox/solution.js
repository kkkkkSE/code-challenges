function solution(order) {
    const stack = [];
    let answer = 0;
    let boxNum = 1, orderIdx = 0;
    let loop;

    while(boxNum <= order.length || loop){
        loop = false;

        if(stack.length > 0 && stack[stack.length-1] === order[orderIdx]){
            stack.pop();
            orderIdx++;
            answer++;
            loop = true;
            continue;
        }

        if(boxNum <= order.length){
            if(order[orderIdx] === boxNum){
                orderIdx++;
                answer++;
                loop = true;
            }else{
                stack.push(boxNum);
            }
            boxNum++;
        }
    }

    return answer;
}

// 본 컨테이너에서 1부터 N까지 실어 나른다. 나르는 장소는 두곳이다
// 1. 본 컨테이너에서 택배를 순서대로 꺼낸다.
// 2-1. 보조 컨테이너 : order 순서에 안맞다면 보조 컨테이너에 싣는다.
// 2-2. 트럭 : order의 순서에 맞다면 트럭에 싣는다.

// 보조 컨테이너에 물건이 있을 경우, 본 컨테이너의 택배를 꺼내기 전 과정을 추가한다.
// 1. 보조 컨테이너의 가장 마지막에 실은 물건이 order 순서에 맞는지 확인하여 트럭에 싣는다.
// 2. 본 컨테이너에서 택배를 순서대로 꺼낸다.
// 3-1. 보조 컨테이너 : order 순서에 안맞다면 보조 컨테이너에 싣는다.
// 3-2. 트럭 : order의 순서에 맞다면 트럭에 싣는다.

// 이 반복문을 언제까지 실행할 것인가?
// - 본 컨테이너에 택배가 남아있는 한 계속한다.
// - 보조 컨테이너의 택배(마지막 순서)를 트럭에 실을 수 있을 때까지 계속한다.

// 본 컨테이너의 택배를 보조 컨테이너 또는 트럭으로 이동시킬 때,
// 그리고 order의 순서에 맞게 트럭에 실렸을 때 배열을 편집하는 과정이 들어가면 시간초과 이슈 발생.
// => 배열을 편집하는 대신 변수에 index, box 번호를 저장해서 사용