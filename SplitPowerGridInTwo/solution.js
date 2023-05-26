function solution(n, wires) {
    const obj = {};
    let answer = Infinity;

    // 최초의 송전탑 연결 정보 객체 만들기
    for(let i = 1; i <= n; i++) obj[i] = [];

    for(let i = 0; i < wires.length; i++){
        const [v1, v2] = wires[i];
        
        obj[v1].push(v2);
        obj[v2].push(v1);
    }

    // wires의 원소를 차례대로 하나씩 끊어본다.
    outer : for(let i = 0; i < wires.length; i++){
        const v = { ...obj };
        const [v1, v2] = wires[i];
        const visited = new Array(n+1).fill(false);
        const linkArr = []; // 한번에 연결돼있는 송전탑 개수 기록

        visited[0] = true;

        // wire[i] 연결 끊기
        v[v1] = v[v1].filter(el => el !== v2);
        v[v2] = v[v2].filter(el => el !== v1);

        // 연결 끊은 후 연결 상태 체크
        for(let j = 1; j < visited.length; j++){
            if(visited[j]) continue;
            if(linkArr.length >= 2) continue outer; // 연결 끊은 후 3개 이상으로 스플릿 됐을 때

            let link = 0;
            let visit = [j]; // 방문해야 할 송전탑 번호 리스트

            while(visit.length){
                const el = visit.shift();

                if(!visited[el]){
                    visited[el] = true;
                    link++;
                    visit = [...visit, ...v[el]]
                }
            }
            linkArr.push(link);
        }
        answer = Math.min(answer, Math.abs(linkArr[0] - linkArr[1]));
    }
    return answer;
}

// 맨 처음 송전탑의 연결을 그래프(object+array)로 나타낸다.
// 연결을 끊는다는 의미가 wires의 배열 원소 중 하나에 대한 연결상태를 삭제한다는 것
// wires를 차례로 순회하면서, i번째 원소는 제외하고 나머지 원소만으로 연결상태를 체크한다.
// visited 배열 만들기 -> 인덱스와 송전탑의 번호를 동일하게
//    1. 특정 원소부터 시작해서 타고타고 들어가 연결돼있는 송전탑이 몇개인지 체크
//    2. 체크할 때 개수 카운트 및 방문 처리 하기
//    3. 연결돼있는 송전탑을 다 돌았으면, 방문아직 안한 원소부터 다시 시작해서 1,2번 순서 진행
//    4. 1~3 두번 했는데 visited에 방문안한 요소가 있다? 3개로 갈라진거여서 패스해야함.
// 나눠진 두개의 송전탑 연결상태가 몇개로 나눠졌는지 기록한다. -> 이 기록은 wire 하나 끊을 때 마다 전부 기록
// -> answer에 기록하는데, 기록할 때 비교 후 최솟값만 기록한다.


