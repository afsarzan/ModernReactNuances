# React in 90‑ish Minutes

#### Muhammad Ahsan Ayaz

##### Google Developer Expert | Angular & AI

---

## What You Should Know So Far

- HTML
- JavaScript (ES6+) <!-- .element: class="fragment" -->
- CSS <!-- .element: class="fragment" -->
- Git <!-- .element: class="fragment" -->
- Basic programming concepts <!-- .element: class="fragment" -->

---

## Which Tools Do We Need?

- [Antigravity](https://antigravity.dev/) OR [VSCode](https://code.visualstudio.com/Download)
- [NodeJS](https://nodejs.org/en/download/)
- [Git](https://git-scm.com/downloads)
- [Create React App / Vite](https://vitejs.dev/)
- [ES7+ React Snippets Extension](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

---

## Agenda for Today

- What is React & Virtual DOM
- JSX & Components
- State & Props
- Hooks: `useState`, `useEffect`, `useMemo`
- Context API & React Router
- Building a **PokAImon Generator** app (workshop)!

---

## Demo: What We'll Build

**PokAImon Generator** - AI-powered Pokémon creator

- 🎨 Draw your own creature
- 🤖 Generate AI Pokémon from doodles
- 📸 Gallery with like/filter features
- 🌙 Dark mode toggle

**Tech Stack:** React 19, Vite, Tailwind, Express + Postgres

---

## What is React?

- JavaScript library for building UIs <!-- .element: class="fragment" -->
- Created by Facebook (Meta) in 2013 <!-- .element: class="fragment" -->
- Component-based architecture <!-- .element: class="fragment" -->
- Powers Netflix, Airbnb, Instagram <!-- .element: class="fragment" -->

--

## React is NOT a Framework

| Framework        | Library          |
| ---------------- | ---------------- |
| Full solution    | Focused solution |
| Angular, Vue     | React            |
| More opinionated | More flexible    |
| Built-in router  | Choose your own  |

---

## Component-Based Architecture

![Component Architecture](https://placeholder.com/components)

```jsx
function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <MainContent />
      <Footer />
    </div>
  );
}
```

---

# JSX

### JavaScript meets HTML

--

## What is JSX?

```jsx
// What you write
const element = <h1>Hello, React!</h1>;

// What it compiles to
const element = React.createElement('h1', null, 'Hello, React!');
```

--

## JSX Rules

1. Single parent element

<!-- .element: class="fragment" -->

2. `className` instead of `class`

<!-- .element: class="fragment" -->

3. All tags must be closed

<!-- .element: class="fragment" -->

4. JavaScript in `{curly braces}`

<!-- .element: class="fragment" -->

5. Inline styles use `camelCase`

<!-- .element: class="fragment" -->

--

## JSX Rule #1: Single Parent

```jsx
// ❌ WRONG
return (
  <h1>Title</h1>
  <p>Content</p>
)

// ✅ CORRECT
return (
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
)

// ✅ Also correct - Fragment
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
)
```

--

## JSX Rule #2: className & htmlFor

```jsx
// HTML
<div class="container">
  <label for="email">Email</label>
</div>

// JSX
<div className="container">
  <label htmlFor="email">Email</label>
</div>
```

--

## JSX Rule #3: Close All Tags

```jsx
// ❌ HTML style (not allowed)
<img src="photo.jpg">
<input type="text">
<br>

// ✅ JSX style
<img src="photo.jpg" />
<input type="text" />
<br />
```

--

## JSX Rule #4: JavaScript Expressions

```jsx
const name = 'Ahsan';
const items = [1, 2, 3];

return (
  <div>
    <h1>Hello, {name}!</h1>
    <p>Sum: {2 + 2}</p>
    <p>Items: {items.length}</p>
    <p>Today: {new Date().toDateString()}</p>
  </div>
);
```

--

## JSX Rule #5: Inline Styles

```jsx
const styles = {
  color: 'blue',
  fontSize: '16px',
};

return (
  <div style={styles}>
    <h1>Hello, React!</h1>
  </div>
);
```

---

# Virtual DOM

### React's Superpower 🚀

--

## The Problem: Real DOM is Slow

```javascript
// Traditional DOM manipulation
for (let i = 0; i < 1000; i++) {
  document.getElementById(`item-${i}`).textContent = `Value ${i}`;
}
// 1000 DOM operations = 💀
```

--

## The Solution: Virtual DOM

--

<iframe src="assets/supporting-html/virtual-dom-animation.html" width="100%" height="680px" style="border: none;"></iframe>

--

1. React creates lightweight copy
2. Compares old vs new (Diffing)
3. Calculates minimum changes
4. Updates only what changed

--

## Reconciliation Process

![VDOM Updates](assets/images/vdom-updates.png)

<!-- .element: style="width: 100%; height: 500px; border: none;" -->

--

## Diffing Algorithm

```
OLD VDOM              NEW VDOM

   div                   div
  /   \                 /   \
 h1    ul              h1    ul
      /|\                   /|\
    li li li            li li li
   "A" "B" "C"         "A" "X" "C"
                            ↑
                    Only this changes!
```

--

## Why Keys Matter

```jsx
// ❌ Without keys - inefficient
<ul>
  {items.map(item => (
    <li>{item.name}</li>
  ))}
</ul>

// ✅ With keys - optimized
<ul>
  {items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```

---

# Components

### Building Blocks of React

--

## Functional Components

```jsx
// Function declaration
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Arrow function
const Welcome = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

// Usage
<Welcome name="Ahsan" />;
```

--

## Class Components (Legacy)

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

// Modern React = Functional Components
// Use hooks instead of classes!
```

--

## Props - Component Communication

```jsx
// Parent
function App() {
  return <UserCard name="Ahsan" role="Developer" verified={true} />;
}

// Child
function UserCard({ name, role, verified }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
      {verified && <span>✓</span>}
    </div>
  );
}
```

--

## The `children` Prop

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Usage
<Card>
  <h1>Any content</h1>
  <p>Goes here!</p>
</Card>;
```

---

# State Management

### Making Components Dynamic

--

## useState Hook

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

--

## useState Anatomy

```jsx
const [count, setCount] = useState(0);
//      ↑        ↑              ↑
//   Current  Setter        Initial
//    value  function        value
```

Returns an array with exactly 2 elements

--

## State Update Rules

```jsx
// ❌ WRONG - Multiple updates don't stack
setCount(count + 1);
setCount(count + 1); // Still adds 1!

// ✅ CORRECT - Functional updates
setCount((prev) => prev + 1);
setCount((prev) => prev + 1); // Adds 2!
```

--

## State is Immutable

```jsx
// ❌ WRONG - Direct mutation
const [user, setUser] = useState({ name: 'A' });
user.name = 'B'; // NO!

// ✅ CORRECT - Create new object
setUser({ ...user, name: 'B' });

// ❌ WRONG - Array mutation
items.push(newItem); // NO!

// ✅ CORRECT - Spread operator
setItems([...items, newItem]);
```

---

# useEffect Hook

### Side Effects in React

--

## What Are Side Effects?

- Data fetching
- Subscriptions
- DOM manipulation
- Timers
- Logging

--

## useEffect Anatomy

```jsx
useEffect(() => {
  // Effect code runs here
  console.log('Effect ran!');

  return () => {
    // Cleanup (optional)
    console.log('Cleanup ran!');
  };
}, [dependencies]);
```

--

## Three Ways to Use useEffect

```jsx
// 1. Run on EVERY render
useEffect(() => {
  /* ... */
});

// 2. Run ONLY on mount
useEffect(() => {
  /* ... */
}, []);

// 3. Run when dependencies change
useEffect(() => {
  /* ... */
}, [userId]);
```

--

## Real-World Example

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <Spinner />;
  return <div>{user.name}</div>;
}
```

--

## Complete API Call Pattern

```jsx
function PokemonGallery() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://localhost:3001/api/gallery');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}
```

Production-ready with error handling!

--

## Common Mistakes

```jsx
// ❌ Missing dependency
useEffect(() => {
  console.log(count); // Using count...
}, []); // ...but not in deps!

// ❌ Object in dependencies
useEffect(() => {
  // Runs EVERY render!
}, [{ name: 'test' }]);
```

---

# More Essential Hooks

--

<iframe src="assets/supporting-html/hooks-visualization.html" width="100%" height="680px" style="border: none;"></iframe>

--

## useRef

```jsx
function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}
```

Persists across renders without causing re-renders

--

## useMemo

```jsx
function FilteredList({ items, filter }) {
  // Only recalculates when items or filter change
  const filtered = useMemo(() => {
    return items.filter((item) => item.name.includes(filter));
  }, [items, filter]);

  return <List items={filtered} />;
}
```

Cache expensive calculations

--

## useCallback

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // Same function reference between renders
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []);

  return <MemoizedChild onClick={handleClick} />;
}
```

Cache function references

--

## useReducer

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}
```

---

# Context API

### Avoiding Prop Drilling

--

<iframe src="assets/supporting-html/context-api-animation.html" width="100%" height="680px" style="border: none;"></iframe>

--

## The Problem: Prop Drilling

```jsx
<App user={user}>
  <Header user={user}>
    <Nav user={user}>
      <UserMenu user={user}>
        <Avatar user={user} />
      </UserMenu>
    </Nav>
  </Header>
</App>
```

😱 Passing props through every level!

--

## The Solution: Context

```jsx
// 1. Create context
const UserContext = createContext(null);

// 2. Provider component
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Custom hook
function useUser() {
  return useContext(UserContext);
}
```

--

## Using Context

```jsx
// Wrap app
<UserProvider>
  <App />
</UserProvider>;

// Use anywhere - no prop drilling!
function Avatar() {
  const { user } = useUser();
  return <img src={user.avatar} />;
}
```

--

## Context Best Practices

- Split contexts by concern <!-- .element: class="fragment" -->
- Don't use for frequently changing state <!-- .element: class="fragment" -->
- Create custom hooks for contexts <!-- .element: class="fragment" -->
- Consider state management libraries for complex state <!-- .element: class="fragment" -->

---

# React Router

### Navigation Made Easy

--

## Why Routing?

Single Page Applications (SPAs) need:

- Multiple "pages" without page reload <!-- .element: class="fragment" -->
- URL-based navigation <!-- .element: class="fragment" -->
- Browser back/forward support <!-- .element: class="fragment" -->
- Shareable URLs <!-- .element: class="fragment" -->

--

## Installation

```bash
npm install react-router-dom
```

React Router is the standard routing library for React

--

## Basic Setup

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

--

## Navigation with Link

```jsx
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

`Link` prevents full page reload!

--

## Active Links with NavLink

```jsx
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        Home
      </NavLink>
    </nav>
  );
}
```

Know which page is active!

--

## Dynamic Routes

```jsx
<Routes>
  <Route path="/users/:userId" element={<UserProfile />} />
  <Route path="/products/:id" element={<Product />} />
</Routes>;

// Access params in component
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  return <div>User ID: {userId}</div>;
}
```

--

## Programmatic Navigation

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // After login...
    navigate('/dashboard');
  };

  return <button onClick={handleSubmit}>Login</button>;
}
```

Navigate from code!

---

# Suspense & Error Boundaries

--

## Suspense

```jsx
import { Suspense, lazy } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

Declarative loading states

--

## Error Boundaries

```jsx
<ErrorBoundary fallback={<ErrorUI />}>
  <Suspense fallback={<Loading />}>
    <DataComponent />
  </Suspense>
</ErrorBoundary>
```

Suspense handles loading, Error Boundaries handle errors

---

# React 19 🎉

### The Future is Here!

--

<iframe src="assets/supporting-html/react-19-features.html" width="100%" height="680px" style="border: none;"></iframe>

--

## New `use` Hook

```jsx
function UserProfile({ userPromise }) {
  // Suspends until promise resolves!
  const user = use(userPromise);
  return <h1>Hello, {user.name}!</h1>;
}

<Suspense fallback={<Loading />}>
  <UserProfile userPromise={fetchUser()} />
</Suspense>;
```

Read promises directly in components!

--

## useActionState

```jsx
async function submitForm(prevState, formData) {
  const result = await saveData(formData);
  return { success: true, message: 'Saved!' };
}

function Form() {
  const [state, action, isPending] = useActionState(submitForm, null);

  return (
    <form action={action}>
      <input name="email" />
      <button disabled={isPending}>Submit</button>
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}
```

--

## useFormStatus

```jsx
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>{pending ? 'Submitting...' : 'Submit'}</button>
  );
}

// Child component knows form state!
```

--

## useOptimistic

```jsx
function Messages({ messages, sendMessage }) {
  const [optimistic, addOptimistic] = useOptimistic(
    messages,
    (state, newMsg) => [...state, {
      text: newMsg,
      sending: true
    }]
  );

  async function send(formData) {
    addOptimistic(formData.get('message'));
    await sendMessage(formData);
  }

  return (/* render optimistic messages */);
}
```

Instant UI feedback!

--

## Server Components

```jsx
// This runs on the SERVER
async function ProductPage({ id }) {
  // Direct database access - no API needed!
  const product = await db.products.find(id);

  return (
    <div>
      <h1>{product.name}</h1>
      <AddToCart id={id} /> {/* Client Component */}
    </div>
  );
}
```

--

## Server Actions

```jsx
// Define server action
'use server';
async function addToCart(productId) {
  await db.cart.add({ productId });
  revalidatePath('/cart');
}

// Use in client component
<form action={addToCart}>
  <input type="hidden" name="id" value={product.id} />
  <button>Add to Cart</button>
</form>;
```

--

## React Compiler

```jsx
// Before - Manual memoization
function Component({ items }) {
  const filtered = useMemo(() => items.filter((i) => i.active), [items]);
  const handleClick = useCallback(() => {}, []);
}

// After - Compiler handles it!
function Component({ items }) {
  const filtered = items.filter((i) => i.active);
  const handleClick = () => {};
}
// Automatic optimization! ✨
```

---

# Interview Questions 🎯

--

## "What is React?"

> A JavaScript **library** for building user interfaces using a **component-based** architecture with a **Virtual DOM** for efficient updates.

--

## "What is Virtual DOM?"

> A lightweight JavaScript representation of the real DOM. React uses it to calculate minimal updates needed, then batches changes to the real DOM for optimal performance.

--

## "Props vs State?"

| Props                | State                 |
| -------------------- | --------------------- |
| Passed from parent   | Internal to component |
| Read-only            | Can change            |
| Like function params | Like local variables  |

--

## "Why Keys in Lists?"

> Keys help React identify which items changed, added, or removed. Without keys, React re-renders entire lists. With keys, it updates only what changed.

--

## "When useReducer vs useState?"

| useState     | useReducer          |
| ------------ | ------------------- |
| Simple state | Complex state       |
| Single value | Multiple sub-values |
| Independent  | Related transitions |

--

## "What's New in React 19?"

- `use` hook for promises <!-- .element: class="fragment" -->
- Server Components <!-- .element: class="fragment" -->
- Server Actions <!-- .element: class="fragment" -->
- useActionState, useFormStatus <!-- .element: class="fragment" -->
- useOptimistic <!-- .element: class="fragment" -->
- React Compiler <!-- .element: class="fragment" -->

---

# Quick Reference

--

## Hooks Summary

| Hook        | Purpose               |
| ----------- | --------------------- |
| useState    | State in components   |
| useEffect   | Side effects          |
| useContext  | Access context        |
| useRef      | Refs & mutable values |
| useMemo     | Cache values          |
| useCallback | Cache functions       |
| useReducer  | Complex state         |

--

## React 19 Hooks

| Hook           | Purpose                |
| -------------- | ---------------------- |
| use            | Read promises/context  |
| useActionState | Form action state      |
| useFormStatus  | Form submission status |
| useOptimistic  | Optimistic updates     |

---

# Let's Build! 🚀

### Time to Code Together

--

## Project Demo

Building a Task Manager with:

- React 19 features
- useState & useEffect
- Context API
- Form handling
- Optimistic updates

---

# Thank You! 🙏

### Muhammad Ahsan Ayaz

- YouTube: Code with Ahsan
- Twitter: @AhsanAyaz
- LinkedIn: /in/nicholasahsan

**Like, Subscribe & Share!**

---

## Resources

- [React Documentation](https://react.dev)
- [React 19 Blog](https://react.dev/blog)
- [This Course's GitHub Repo](#)
- [Code with Ahsan YouTube](#)
