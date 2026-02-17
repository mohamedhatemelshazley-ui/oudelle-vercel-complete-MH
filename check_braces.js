
const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

let inScript = false;
let balance = 0;
let stack = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes('<script>')) {
        inScript = true;
        console.log(`Script starts at line ${i + 1}`);
        continue;
    }
    if (line.includes('</script>')) {
        inScript = false;
        console.log(`Script ends at line ${i + 1}, balance: ${balance}`);
    }

    if (!inScript) continue;

    // Simple char loop with state for strings
    let state = 'code'; // code, string_double, string_single, template

    for (let j = 0; j < line.length; j++) {
        const char = line[j];

        if (state === 'code') {
            if (char === '"') state = 'string_double';
            else if (char === "'") state = 'string_single';
            else if (char === '`') state = 'template';
            else if (char === '{') {
                balance++;
                stack.push(i + 1);
            } else if (char === '}') {
                balance--;
                if (balance < 0) {
                    console.log(`Error: Unexpected } at line ${i + 1} col ${j + 1}`);
                    process.exit(1);
                }
                stack.pop();
            } else if (char === '/' && line[j + 1] === '/') {
                break; // comment
            }
        } else if (state === 'string_double') {
            if (char === '"' && line[j - 1] !== '\\') state = 'code';
        } else if (state === 'string_single') {
            if (char === "'" && line[j - 1] !== '\\') state = 'code';
        } else if (state === 'template') {
            if (char === '`' && line[j - 1] !== '\\') state = 'code';
        }
    }
}

if (balance > 0) {
    console.log(`Error: Missing } at EOF. Balance is ${balance}. Last open brace was at line ${stack[stack.length - 1]}`);
} else {
    console.log("Braces seem balanced.");
}
