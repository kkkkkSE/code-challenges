function solution(cards) {
    const lists = [];
    const visited = new Array(cards.length).fill(false);

    cards = cards.map(v => v-1); // index와 숫자카드 동일하게 맞춤

    for(let i = 0; i < cards.length; i++){
        const card = cards[i];
        const list = [];
        let next = cards[card], prev = i;

        if(visited[card]) continue;
        visited[card] = true;
        list.push(card);

        while(!visited[next]){
            visited[next] = true;
            list.push(next);
            next = cards[next];
        }

        while(!visited[prev]){
            visited[prev] = true;
            list.unshift(prev);
            prev = cards.indexOf(prev);
        }

        lists.push(list);
    }

    lists.sort((a, b) => b.length - a.length);

    if(lists.length <= 1) return 0;
    return lists[0].length * lists[1].length;
}

// 1번 상자 개수 * 2번 상자 개수가 최대값이 되려면 최대한 반반에 가까워야 함.
// 각 카드의 연결 상태를 찾아내고(연결 리스트), 연결되어 있는 그룹의 개수가 가장 많은 것 두가지를 뽑자.

// 연결 리스트는 배열로 형성하며, cards를 순회하면서 연결리스트를 만든다.
// 이미 방문한 원소는 다시 방문하지 않도록 visited 배열 만들기

// 예시 - [8,6,3,7,2,5,1,4] 에서
// 처음 8을 만나면, list에 8을 넣는다. 이후에는 두가지 동작을 각각 반복하며 방문리스트에 추가한다.

// 1. 다음 원소 (index (8-1))로 찾아가서 있는 원소를 list에 push + visited true
// 2. 이전원소(8이 있는 위치(index 0)에 해당하는)를 list에 unshift + visited true

// 1,2를 반복하다 보면 이미 방문한 원소를 만나게 되는데, 더이상 list를 늘릴 수 없는 경우이므로 동작 반복을 중단. 
// 만들어진 list를 lists에 넣고 다음 원소로 넘어가 반복.
// 여기서도 visited 배열을 참고하여 이전 리스트에서 이미 방문된 원소면 continue

// 마지막에 lists에 담긴 list의 최대 길이 두개를 골라 곱해서 반환한다.