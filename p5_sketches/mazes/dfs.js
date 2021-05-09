function dfsStep(drawFunction) {
flag = false;

while (!flag) {
    n = stack[stack.length - 1]

    visited[n] = true;

    for (let i = 0; i < nodes[n].neighbours.length; i++) {
        let node = nodes[n].neighbours[i];
        if (visited[node.index]) continue;

        stack.push(node.index);
        drawFunction(n, node.index);

        flag = true;
        break;

    }

    if (!flag) {
        stack.pop();

        if (stack.length == 0) {
            dfsFinished = true;
            break;
        }
    }
}
}