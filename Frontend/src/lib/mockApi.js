// Mock API responses for demonstration purposes.
// Replace fetchComparison() with a real API call when a backend is available.

const MOCK_RESPONSES = [
  {
    problem:
      "Write a function in Python to find all prime numbers up to a given number N using the Sieve of Eratosthenes algorithm.",
    solution_1: `## Solution: Sieve of Eratosthenes

Here's a clean, efficient Python implementation:

\`\`\`python
def sieve_of_eratosthenes(n: int) -> list[int]:
    """
    Find all prime numbers up to n using the Sieve of Eratosthenes.
    
    Time complexity:  O(n log log n)
    Space complexity: O(n)
    """
    if n < 2:
        return []
    
    # Initialize a boolean array where index = number
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    
    p = 2
    while p * p <= n:
        if is_prime[p]:
            # Mark all multiples of p as composite
            for multiple in range(p * p, n + 1, p):
                is_prime[multiple] = False
        p += 1
    
    return [num for num, prime in enumerate(is_prime) if prime]


# Example usage
primes = sieve_of_eratosthenes(50)
print(primes)
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
\`\`\`

### Key Design Decisions

- **Starting at p²** — Any composite smaller than p² was already marked by a smaller prime, so we skip ahead.
- **Boolean array** — More cache-friendly than a set for dense ranges.
- **Type hints** — Adds clarity without runtime overhead.

### Performance

| N | Approx. primes | Time |
|---|---|---|
| 1,000 | 168 | < 1ms |
| 1,000,000 | 78,498 | ~50ms |
| 10,000,000 | 664,579 | ~500ms |
`,
    solution_2: `## NumPy-Accelerated Sieve

A vectorized approach for large ranges using NumPy:

\`\`\`python
import numpy as np

def sieve_numpy(n: int) -> np.ndarray:
    """
    Vectorized Sieve of Eratosthenes using NumPy.
    Significantly faster for large N due to batch operations.
    
    Time complexity:  O(n log log n)
    Space complexity: O(n)
    """
    if n < 2:
        return np.array([], dtype=np.int64)
    
    sieve = np.ones(n + 1, dtype=bool)
    sieve[0:2] = False
    
    for p in range(2, int(n**0.5) + 1):
        if sieve[p]:
            sieve[p*p::p] = False   # vectorized slice assignment
    
    return np.nonzero(sieve)[0]


# Example usage
primes = sieve_numpy(50)
print(primes.tolist())
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
\`\`\`

### Why NumPy Slice Assignment?

\`sieve[p*p::p] = False\` replaces an entire Python \`for\` loop with a single C-level operation, yielding **5–20× speedup** on large inputs.

### Tradeoffs

- ✅ Dramatically faster for N > 10^6
- ✅ Returns a NumPy array (easy further math)
- ⚠️ Requires NumPy (external dependency)
- ⚠️ Slightly more memory due to \`int64\` dtype vs. Python booleans

### Benchmarks (Apple M2)

\`\`\`
N = 10,000,000
  Pure Python: 1.24s
  NumPy sieve:  0.09s  ← 13.7× faster
\`\`\`
`,
    judge: {
      solution_1_score: 8,
      solution_2_score: 9,
      solution_1_reasoning:
        "Well-structured pure Python implementation with correct O(n log log n) complexity, type hints, and a helpful performance table. Suitable for any environment but slower for very large N.",
      solution_2_reasoning:
        "The NumPy vectorized approach is substantially faster on large inputs and includes benchmark data to justify the extra dependency. Excellent for data-science or scientific contexts where NumPy is already available.",
    },
  },
  {
    problem:
      "Explain how React's useEffect hook works, including the dependency array and cleanup functions.",
    solution_1: `## React's \`useEffect\` Hook

\`useEffect\` lets you synchronize a component with an external system — such as the DOM, a network request, or a timer.

### Basic Syntax

\`\`\`jsx
useEffect(() => {
  // effect code runs here

  return () => {
    // optional cleanup
  };
}, [dependencies]);
\`\`\`

### The Dependency Array

| Array | Behavior |
|---|---|
| Omitted | Effect runs after *every* render |
| \`[]\` | Effect runs once (mount only) |
| \`[a, b]\` | Effect runs when \`a\` or \`b\` changes |

### Cleanup Functions

Return a function from the effect to clean up subscriptions, timers, or event listeners before the next run:

\`\`\`jsx
useEffect(() => {
  const controller = new AbortController();

  fetch("/api/data", { signal: controller.signal })
    .then(res => res.json())
    .then(setData);

  return () => controller.abort(); // cleanup on unmount
}, []);
\`\`\`

### Common Pitfalls

- **Missing deps** — ESLint's \`exhaustive-deps\` rule catches this.
- **Infinite loops** — Adding an object/array literal to the dep array creates a new reference every render; memoize with \`useMemo\` or \`useCallback\`.
- **Strict Mode double-fires** — React fires effects twice in development to surface cleanup bugs.
`,
    solution_2: `## Deep Dive: \`useEffect\`

\`useEffect\` is React's escape hatch for side effects — anything that reaches outside the pure render cycle.

### Execution Model

\`\`\`
Render → Paint → Effect runs
         ↑
         Cleanup from previous effect runs first
\`\`\`

### Three Flavors

\`\`\`jsx
// 1. Run on every render
useEffect(() => { document.title = "Hello"; });

// 2. Run once on mount
useEffect(() => {
  const sub = subscribe(userId);
  return () => sub.unsubscribe();
}, []);

// 3. Run when deps change
useEffect(() => {
  fetchUser(userId).then(setUser);
}, [userId]);
\`\`\`

### Lifecycle Mapping

| Class method | useEffect equivalent |
|---|---|
| \`componentDidMount\` | \`useEffect(fn, [])\` |
| \`componentDidUpdate\` | \`useEffect(fn, [dep])\` |
| \`componentWillUnmount\` | cleanup return |

### Data Fetching Best Practices

\`\`\`jsx
function UserProfile({ id }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchUser(id).then(data => {
      if (!cancelled) setUser(data);
    });

    return () => { cancelled = true; };
  }, [id]);

  return user ? <div>{user.name}</div> : <Spinner />;
}
\`\`\`

> **Prefer libraries**: React Query, SWR, or TanStack Query handle caching, deduplication, and error states far better than raw \`useEffect\`.
`,
    judge: {
      solution_1_score: 8,
      solution_2_score: 9,
      solution_1_reasoning:
        "Clear, well-organized explanation covering the dependency array variants, cleanup pattern, and common pitfalls. Great for beginners.",
      solution_2_reasoning:
        "Goes deeper with an execution model diagram, lifecycle mapping table, and a real-world data-fetching pattern with race-condition handling. More actionable for intermediate developers.",
    },
  },
  {
    problem:
      "Design a rate limiter system for an API that needs to handle 10,000 requests per second.",
    solution_1: `## Token Bucket Rate Limiter

The **Token Bucket** algorithm is the industry standard for API rate limiting — it allows short bursts while enforcing a long-term average rate.

### Architecture

\`\`\`
Client → API Gateway → Rate Limiter (Redis) → Backend
\`\`\`

### Redis Implementation

\`\`\`python
import redis
import time

class TokenBucketRateLimiter:
    def __init__(self, host="localhost", port=6379):
        self.redis = redis.Redis(host=host, port=port)

    def is_allowed(
        self,
        key: str,
        capacity: int,      # max tokens (burst size)
        refill_rate: float, # tokens per second
    ) -> bool:
        now = time.time()
        pipe = self.redis.pipeline()

        # Atomic Lua script prevents race conditions
        script = """
        local key      = KEYS[1]
        local now      = tonumber(ARGV[1])
        local capacity = tonumber(ARGV[2])
        local rate     = tonumber(ARGV[3])
        local ttl      = tonumber(ARGV[4])

        local data     = redis.call('HMGET', key, 'tokens', 'last_refill')
        local tokens   = tonumber(data[1]) or capacity
        local last     = tonumber(data[2]) or now

        -- Refill tokens based on elapsed time
        local elapsed  = now - last
        tokens = math.min(capacity, tokens + elapsed * rate)

        if tokens >= 1 then
            tokens = tokens - 1
            redis.call('HMSET', key, 'tokens', tokens, 'last_refill', now)
            redis.call('EXPIRE', key, ttl)
            return 1   -- allowed
        else
            return 0   -- rejected
        end
        """
        result = self.redis.eval(script, 1, key, now, capacity, refill_rate, 60)
        return bool(result)
\`\`\`

### Scaling to 10k RPS

| Strategy | Impact |
|---|---|
| Redis Cluster (6 shards) | Distributes key space |
| Lua atomicity | No race conditions |
| Pipeline batching | Reduces round trips |
| Local in-proc cache | Absorbs hot keys |
`,
    solution_2: `## Sliding Window Counter (Distributed)

A **Sliding Window Log** gives more accurate rate limiting than fixed windows at the cost of slightly more memory.

### System Design

\`\`\`
                ┌─────────────────┐
Clients ───────▶│  Load Balancer  │
                └────────┬────────┘
                         │ Round-robin
              ┌──────────┼──────────┐
              ▼          ▼          ▼
           API-1       API-2      API-3
              └──────────┼──────────┘
                         │
                  ┌──────▼──────┐
                  │ Redis Cluster│
                  │  (3 primary  │
                  │  + replicas) │
                  └─────────────┘
\`\`\`

### Implementation

\`\`\`python
import redis
import time

r = redis.Redis()

def sliding_window_check(user_id: str, limit: int = 100, window: int = 1) -> bool:
    """
    Sliding window rate limiter using a sorted set.
    Each element is a unique request timestamp.
    """
    key = f"ratelimit:{user_id}"
    now = time.time()
    window_start = now - window

    pipe = r.pipeline()
    pipe.zremrangebyscore(key, 0, window_start)   # prune old entries
    pipe.zadd(key, {str(now): now})               # add current request  
    pipe.zcard(key)                               # count requests
    pipe.expire(key, window + 1)
    results = pipe.execute()

    request_count = results[2]
    return request_count <= limit
\`\`\`

### Scaling Strategies

1. **Redis Cluster**: Shard by \`user_id % N_shards\`
2. **Cell-based rate limiting**: Combine sliding window for user + token bucket for global
3. **Local caching**: Cache "definitely under limit" decisions for 100ms
4. **Circuit breaker**: If Redis is down, fail open with degraded limits

### Capacity Estimate

\`\`\`
10,000 RPS × 1KB per sorted set entry = 10 MB/s write throughput
Redis can handle ~100k ops/sec per node → need 1–2 Redis shards
\`\`\`
`,
    judge: {
      solution_1_score: 9,
      solution_2_score: 9,
      solution_1_reasoning:
        "Excellent production-ready implementation using Lua scripting for atomicity, covering the Token Bucket algorithm with a complete working example and scaling table.",
      solution_2_reasoning:
        "Strong system design perspective with ASCII architecture diagrams, capacity estimates, and a clear sliding window implementation. The multi-strategy scaling section adds depth.",
    },
  },
];

/**
 * Simulates an API call with realistic latency.
 * Replace this with your actual backend endpoint.
 */
export async function fetchComparison(prompt) {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 1800 + Math.random() * 800));

  // Return a deterministic mock based on the prompt
  const index = Math.abs(prompt.length % MOCK_RESPONSES.length);
  const mock = MOCK_RESPONSES[index];

  return {
    data: {
      problem: prompt,
      solution_1: mock.solution_1,
      solution_2: mock.solution_2,
      judge: mock.judge,
    },
  };
}
