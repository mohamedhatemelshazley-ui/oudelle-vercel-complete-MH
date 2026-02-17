
import re

with open(r'c:\Users\NewTech\.gemini\antigravity\scratch\oudelle-vercel-complete\index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

in_script = False
balance = 0
last_open_line = -1

for i, line in enumerate(lines, 1):
    if '<script>' in line:
        in_script = True
        print(f"Script starts at {i}")
        continue
    if '</script>' in line:
        in_script = False
        print(f"Script ends at {i}, balance: {balance}")
        if balance != 0:
             print(f"Unbalanced at end of script! Balance: {balance}")
        continue
    
    if notInScript: continue

    line_stripped = line.strip()
    # Simplified parser: count braces outside strings/comments?
    # This is hard to do correctly with simple counters if there are complex strings.
    # But let's try basic counting for now, as it's likely a simple block issue.
    
    # Remove strings to avoid counting braces inside them
    # This is a naive removal, but often sufficient for debugging
    line_no_str = re.sub(r'([\"\']).*?\1', '', line) 
    # Remove template strings (backticks) - very naive, doesn't handle multiline
    # JS template strings can be multiline, so line-by-line is risky.
    
    for char in line_no_str:
        if char == '{':
            balance += 1
            last_open_line = i
        elif char == '}':
            balance -= 1

    if balance < 0:
        print(f"Error: Negative balance at line {i}")
        break

if balance > 0:
    print(f"Error: Positive balance {balance} at EOF. Last open brace around line {last_open_line}")
