function solution(orders, course) {
    const setMenu = {};
    const answer = [];

    course.forEach(v => {
        setMenu[v] = {}
    });

    // 메뉴 오름차순 정렬
    orders = orders.map(v => [...v].sort().join(""));

    // 세트메뉴 조합 기록할 헬퍼 함수
    function findSetMenu(menu, foods = '', start = 0){
        const len = foods.length;

        if(course.indexOf(len) >= 0){
            setMenu[len][foods] = setMenu[len][foods] 
                ? setMenu[len][foods] + 1
                : 1;
        }

        if(foods.length === course.at(-1)) return;

        for(let i = start; i < menu.length; i++){
            findSetMenu(menu, foods + menu[i], i + 1);
        }
    }

    // 세트메뉴 조합 기록
    for(let j = 0; j < orders.length; j++){
        const menu = orders[j];
        findSetMenu(menu);
    }

    // 코스 음식 개수 별 인기조합 찾기
    course.forEach(num => {
        const max = Math.max(...Object.values(setMenu[num]));

        Object.entries(setMenu[num]).forEach(v => {
            const key = v[0], val = v[1];
            if(val === max && val >= 2) answer.push(key);
        })
    });

    return answer.sort();
}

// 2차 시도
// 1. orders를 순회하면서 각 손님이 시킨 단품메뉴로 만들 수 있는 세트메뉴의 모든 경우의 수를 객체에 저장한다.
//    -> course 원소별로 구분
// 2. 2번 이상 && 가장 많이 선호한 구성은 answer에 넣는다.
// 3. answer를 오름차순하여 리턴한다.

// 1차 시도
// 1. 단품메뉴의 종류를 체크한다.
// 2. 단품메뉴를 조합했을 때 나오는 경우들을 모두 체크한다. 단, course 배열에 있는 원소를 참고한 갯수만 체크
// 3. 2번에서 나온 조합들 순회하며 orders 순회, 해당 조합에 대해 2번 이상이면 result에 포함시키고 continue
// 4. 오름차순하여 반환
// => 메모리 초과
