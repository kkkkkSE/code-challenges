function solution(N, road, K) {
    const roadObj = {};
    const distance = {}; // 1번 마을로부터의 거리
    let answer = 0;

    // 그래프 생성, 객체 초기화
    for(let i = 1; i <= N; i++) {
        roadObj[i] = []; 
        distance[i] = i !== 1 ? Infinity : 0;
    }

    for(let i = 0; i < road.length; i++){
        const [v1, v2, d] = road[i];
        roadObj[v1].push({ node : v2, d});
        roadObj[v2].push({ node : v1, d});
    }

    // 그래프 순회
    const queue = ['1']; // 방문 예정 queue

    while(queue.length){
        const prev = queue.shift(); // 해당 노드를 중심으로 연결된 마을 방문할 것임.

        for(let i = 0; i < roadObj[prev].length; i++){
            const node = roadObj[prev][i].node; // 방문한 마을 번호
            const d = distance[prev] + roadObj[prev][i].d; // 1번 마을로부터의 거리
            
            const prevDistance = distance[node]; // 이전에 다른 노드를 통해 등록돼있던 거리 정보(또는 초기값)
            distance[node] = Math.min(distance[node], d);

            if(prevDistance !== distance[node]){ // 최단거리 갱신 시
                queue.push(node);
            }
        }
    }

    // answer 도출
    for(let v in distance){
        if(distance[v] <= K) answer++;
    }

    return answer;
}

// 가중치 그래프를 생성한다.(roadObj)
// 1번 마을부터 시작해서 그래프를 순회하기 위해 queue에 담는다. 순회는 queue에 아무것도 없을때까지!
// queue의 첫 원소를 떼와서, 해당 원소랑 연결된 모든 노드에서 1번 마을까지의 거리를 체크한다.
//    바로 이전 노드(queue에서 떼온 첫 원소를 가리킴)의 distance 정보를 참고하여 거리 체크
//    distance 객체가 갱신(첫등록, 최단거리 갱신)된다면 queue에 한번 더 담는다.
//    -> 순회중인 노드의 최단거리가 갱신되었으므로 다른 경로 또한 갱신될 수 있기 때문임.
// queue 순회가 모두 끝나면 distance 객체를 순회하며 K이하인 마을을 찾는다.