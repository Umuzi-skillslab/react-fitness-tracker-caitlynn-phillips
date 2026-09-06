# Fitness Tracker Application Planning Document

## 1. Component Hierarchy
- **App** (Root Container & State Provider)
  - **Navbar** (Navigation Header & Mobile Menu Toggle)
  - **Routes / Pages**
    - **Home**: `AudioPlayer`, `ExerciseCard` (Featured Grid), `Button`
    - **ExercisesPage**: `SearchBar`, `ExerciseFilter`, `ExerciseList` -> `ExerciseCard` -> `Badge`, `Button`
    - **ExerciseDetailPage**: `ExerciseDetail` -> `VideoPlayer`, `Badge`, `Button`
    - **WorkoutPlannerPage**: `WorkoutPlanner` -> `DayCard` (x7) -> `Button`
    - **HistoryPage**: `WorkoutLog` -> `LogEntry`, `Button`
    - **ProgressPage**: `ProgressChart`
    - **NotFound**: `Button`
  - **Modal**: `ExerciseDetail`

## 2. Data Flow Architecture
Data flows top-down from `App.jsx` to page and feature components via props.
- `App.jsx` holds `exercises`, `workoutPlan`, `workoutHistory`, `selectedExercise`, and `showModal` states.
- State persistence is synchronized with `localStorage` via `useLocalStorage`.
- Child-to-Parent communication occurs through callback handlers (`handleAddToWorkout`, `handleRemoveExercise`, `handleClearDay`, `handleLogWorkout`, `handleSelectExercise`).
- Sibling components (e.g., `ExerciseList` and `WorkoutPlanner`) communicate seamlessly via shared state residing in `App.jsx`.

## 3. Component Roster
1. **Navbar**: Navigation link header with active route matching and mobile menu toggle.
2. **Button**: Reusable button with variants (`primary`, `secondary`, `danger`), default props, and hover effects.
3. **Card**: Reusable container card supporting children composition and selection borders.
4. **Badge**: Reusable difficulty/category tag indicator with dynamic styling.
5. **SearchBar**: Interactive search input with focus/blur handling, clear action, and ESC key support.
6. **Loading**: Data loading spinner and customizable loading message.
7. **Modal**: Accessible backdrop dialog component with click backdrop close.
8. **ExerciseCard**: Summary card displaying exercise details, muscle group tags, and action buttons.
9. **ExerciseList**: Responsive grid rendering `ExerciseCard` list, empty states, and loading states.
10. **ExerciseFilter**: Multi-select dropdown filters for category and difficulty level.
11. **ExerciseDetail**: Comprehensive exercise view with video demonstration and step-by-step instructions.
12. **WorkoutPlanner**: 7-day weekly planner grid container.
13. **DayCard**: Individual day schedule column handling exercise removals and day clearing.
14. **WorkoutLog**: Workout logging form supporting sets, reps, weight inputs with validation on blur.
15. **LogEntry**: Single historical workout log item display.
16. **ProgressChart**: Visual progress statistics bar chart tracking workouts, sets, and plan metrics.
17. **VideoPlayer**: HTML5 video player with custom play/pause toggle controls and state tracking.
18. **AudioPlayer**: HTML5 audio player with motivational track playback controls.

## 4. Props Flow
- `App` -> `ExercisesPage` (`exercises`, `plannedIds`, `onSelectExercise`, `onAddToWorkout`)
- `ExercisesPage` -> `ExerciseList` (`exercises`, `isLoading`, `plannedIds`, callbacks)
- `ExerciseList` -> `ExerciseCard` (`exercise`, `isInPlan`, `onSelect`, `onAdd`)
- `App` -> `WorkoutPlannerPage` -> `WorkoutPlanner` -> `DayCard` (`day`, `exercises`, `onRemoveExercise`, `onClearDay`)
- `App` -> `HistoryPage` -> `WorkoutLog` (`exercises`, `workoutHistory`, `onLogWorkout`)
- `App` -> `ProgressPage` -> `ProgressChart` (`workoutHistory`, `workoutPlan`)

## 5. State Strategy & Testing Strategy
- **State Strategy**: Primary state stored centrally in `App.jsx` using `useState` and custom `useLocalStorage` hooks for persistence. Local UI state (`isMobileMenuOpen`, `searchTerm`, `currentLog`, `isPlaying`) managed inside respective functional components.
- **Testing Strategy**: Jest & React Testing Library used for unit tests (rendering, props, default states), integration tests (planner workflow, multi-page data flow), user interactions (typing, clicking, form submission), routing tests (active links, 404 page), and mock functions.
