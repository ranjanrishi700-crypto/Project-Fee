import { useState, useEffect } from "react";

// Initial Data
const exerciseData = [
  {
    name: "Barbell Squat",
    category: "Legs",
    level: "Intermediate",
    description: "Build lower-body strength",
    image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Bench Press",
    category: "Chest",
    level: "Intermediate",
    description: "Build pressing power",
    image: "https://images.unsplash.com/photo-1534367610401-9f5ed68180aa?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Deadlift",
    category: "Back",
    level: "Advanced",
    description: "Train your posterior chain",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Battle Ropes",
    category: "Cardio",
    level: "All levels",
    description: "High-intensity conditioning",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Dumbbell Shoulder Press",
    category: "Shoulders",
    level: "Beginner",
    description: "Develop strong shoulders",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Cable Curl",
    category: "Arms",
    level: "Beginner",
    description: "Controlled biceps training",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=85",
  },
];

const meals = [
  {
    name: "Muscle Gain Bowl",
    calories: "720 kcal",
    protein: "46g protein",
    description: "Chicken, rice, paneer & vegetables",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "High Protein Wrap",
    calories: "540 kcal",
    protein: "38g protein",
    description: "Chicken, salad, hummus & whole wheat wrap",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Power Breakfast",
    calories: "480 kcal",
    protein: "31g protein",
    description: "Oats, banana, berries & peanut butter",
    image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=900&q=85",
  },
];

const plans = [
  {
    name: "STARTER",
    price: "₹999",
    features: ["Gym floor access", "Workout library", "Locker access"],
  },
  {
    name: "PRO",
    price: "₹1,799",
    features: [
      "24/7 gym access",
      "All group classes",
      "Diet & progress tracking",
      "Trainer assessment",
    ],
  },
  {
    name: "ELITE",
    price: "₹2,999",
    features: [
      "Everything in Pro",
      "4 personal training sessions",
      "Custom meal plan",
      "Priority booking",
    ],
  },
];

const initialClasses = [
  {
    id: 1,
    title: "Strength Lab",
    coach: "Sallu Bhai",
    time: "06:30 AM",
    duration: "50 min",
    category: "Strength",
    level: "All levels",
    capacity: 24,
    booked: 18,
  },
  {
    id: 2,
    title: "HIIT Burn",
    coach: "Arjun Mehta",
    time: "08:00 AM",
    duration: "45 min",
    category: "HIIT",
    level: "Intermediate",
    capacity: 20,
    booked: 20,
  },
  {
    id: 3,
    title: "Power Yoga",
    coach: "Priya Shah",
    time: "06:00 PM",
    duration: "60 min",
    category: "Yoga",
    level: "Beginner",
    capacity: 18,
    booked: 11,
  },
  {
    id: 4,
    title: "Boxing Basics",
    coach: "Rohan Singh",
    time: "07:15 PM",
    duration: "50 min",
    category: "Boxing",
    level: "All levels",
    capacity: 16,
    booked: 12,
  },
  {
    id: 5,
    title: "Functional Flow",
    coach: "Nia Williams",
    time: "08:15 PM",
    duration: "45 min",
    category: "Functional",
    level: "Intermediate",
    capacity: 22,
    booked: 9,
  },
];

const trainers = [
  { name: "SALLU BHAI", role: "Strength Coach", imageClass: "t0" },
  { name: "ARJUN MEHTA", role: "HIIT Specialist", imageClass: "t1" },
  { name: "PRIYA SHAH", role: "Yoga & Mobility", imageClass: "t2" },
  { name: "ROHAN SINGH", role: "Boxing Coach", imageClass: "t3" },
];

function App() {
  // Navigation & Theme State
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  // Exercise Library Filters
  const [exerciseQuery, setExerciseQuery] = useState("");
  const [exerciseCategory, setExerciseCategory] = useState("All");

  // Class Schedule Filters & Bookings
  const [classQuery, setClassQuery] = useState("");
  const [classCategory, setClassCategory] = useState("All");
  const [classes, setClasses] = useState(initialClasses);
  const [bookedClassIds, setBookedClassIds] = useState([]);

  // Diet Section State
  const [selectedGoal, setSelectedGoal] = useState("01 / MUSCLE GAIN");

  // Update browser document title based on booked classes count
  useEffect(() => {
    if (bookedClassIds.length > 0) {
      document.title = `CampusFit (${bookedClassIds.length} Booked)`;
    } else {
      document.title = "CampusFit - Gym & Fitness Club";
    }
  }, [bookedClassIds]);

  function handleToggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  function handleToggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function handleCloseMenu() {
    setMenuOpen(false);
  }

  function handleBookClass(id) {
    const targetClass = classes.find((item) => item.id === id);
    if (!targetClass) return;

    const isAlreadyBooked = bookedClassIds.includes(id);

    if (isAlreadyBooked) {
      // Cancel booking and free up the slot
      setBookedClassIds(bookedClassIds.filter((item) => item !== id));
      setClasses(
        classes.map((item) =>
          item.id === id ? { ...item, booked: Math.max(0, item.booked - 1) } : item
        )
      );
    } else {
      // Check if the class is at full capacity
      if (targetClass.booked >= targetClass.capacity) {
        return;
      }
      // Confirm booking and occupy one slot
      setBookedClassIds([...bookedClassIds, id]);
      setClasses(
        classes.map((item) =>
          item.id === id ? { ...item, booked: item.booked + 1 } : item
        )
      );
    }
  }

  function handleContactSubmit(event) {
    event.preventDefault();
    event.target.reset();
  }

  // Filter Exercises based on search term and category button
  const exerciseCategories = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Cardio"];
  const filteredExercises = exerciseData.filter((exercise) => {
    const matchesCategory =
      exerciseCategory === "All" || exercise.category === exerciseCategory;
    const query = exerciseQuery.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      exercise.name.toLowerCase().includes(query) ||
      exercise.category.toLowerCase().includes(query) ||
      exercise.description.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  // Filter Classes based on search term and category button
  const classCategories = ["All", "Strength", "HIIT", "Yoga", "Boxing", "Functional"];
  const filteredClasses = classes.filter((c) => {
    const matchesCategory = classCategory === "All" || c.category === classCategory;
    const query = classQuery.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      c.title.toLowerCase().includes(query) ||
      c.coach.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`site ${theme}`}>
      {/* Header & Navigation */}
      <header className="nav">
        <a className="brand" href="#home">
          <span>CF</span> CAMPUS<span>FIT</span>
        </a>

        <button
          className="hamburger"
          onClick={handleToggleMenu}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "×" : "☰"}
        </button>

        <nav className={menuOpen ? "navlinks open" : "navlinks"}>
          {["Home", "Exercises", "Diet", "Classes", "Membership", "Trainers", "About", "Contact"].map(
            (sectionName) => (
              <a
                key={sectionName}
                href={`#${sectionName.toLowerCase()}`}
                onClick={handleCloseMenu}
              >
                {sectionName}
              </a>
            )
          )}
        </nav>

        <div className="navactions">
          <button
            className="theme"
            onClick={handleToggleTheme}
            aria-label="Toggle light or dark theme"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <a className="btn small" href="#membership">
            JOIN NOW
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-copy">
            <p className="eyebrow">CAMPUSFIT / PERFORMANCE CLUB</p>
            <h1>
              BUILD YOUR
              <br />
              <em>STRONGER</em> SELF.
            </h1>
            <p className="lead">
              Train with purpose. Eat smarter. Track your progress. A complete fitness experience built
              for students and serious athletes.
            </p>
            <div className="hero-buttons">
              <a className="btn" href="#membership">
                START YOUR JOURNEY ↗
              </a>
              <a className="text-btn" href="#classes">
                VIEW CLASSES →
              </a>
            </div>
            <div className="stats">
              <div>
                <b>2.4K+</b>
                <small>ACTIVE MEMBERS</small>
              </div>
              <div>
                <b>42</b>
                <small>WEEKLY CLASSES</small>
              </div>
              <div>
                <b>24/7</b>
                <small>ACCESS</small>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-tag">
              01 / PERFORMANCE
              <br />
              <strong>NO EXCUSES.</strong>
            </div>
          </div>
        </section>

        {/* Brand Banner / Ticker */}
        <section className="ticker">
          <span>STRENGTH</span>
          <b>•</b>
          <span>CONDITIONING</span>
          <b>•</b>
          <span>NUTRITION</span>
          <b>•</b>
          <span>COMMUNITY</span>
          <b>•</b>
          <span>CONSISTENCY</span>
        </section>

        {/* Exercise Library Section */}
        <section id="exercises" className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">01 / TRAIN SMART</p>
              <h2>
                THE <em>EXERCISE</em> LIBRARY
              </h2>
            </div>
            <p>Simple movements. Better technique. Stronger results.</p>
          </div>

          <div className="filters">
            <input
              aria-label="Search exercises"
              placeholder="Search exercise..."
              value={exerciseQuery}
              onChange={(e) => setExerciseQuery(e.target.value)}
            />
            {exerciseCategories.map((cat) => (
              <button
                key={cat}
                className={exerciseCategory === cat ? "active" : ""}
                onClick={() => setExerciseCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="exercise-grid">
            {filteredExercises.map((exercise) => (
              <article className="exercise-card" key={exercise.name}>
                <img src={exercise.image} alt={exercise.name} />
                <div className="card-overlay">
                  <span>
                    {exercise.category} / {exercise.level}
                  </span>
                  <h3>{exercise.name}</h3>
                  <p>{exercise.description}</p>
                  <button>
                    VIEW EXERCISE →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Diet & Nutrition Section */}
        <section id="diet" className="section dark-panel">
          <div className="section-head">
            <div>
              <p className="eyebrow">02 / FUEL BETTER</p>
              <h2>
                EAT FOR <em>YOUR GOAL</em>
              </h2>
            </div>
            <p>High-protein, practical meals with familiar Indian-friendly options.</p>
          </div>

          <div className="goal-row">
            {["01 / MUSCLE GAIN", "02 / FAT LOSS", "03 / MAINTENANCE"].map((goal) => (
              <button
                key={goal}
                className={selectedGoal === goal ? "active" : ""}
                onClick={() => setSelectedGoal(goal)}
              >
                {goal}
              </button>
            ))}
          </div>

          <div className="meal-grid">
            {meals.map((meal) => (
              <article className="meal" key={meal.name}>
                <img src={meal.image} alt={meal.name} />
                <div>
                  <span>
                    {meal.calories} · {meal.protein}
                  </span>
                  <h3>{meal.name}</h3>
                  <p>{meal.description}</p>
                  <button>
                    GET DIET PLAN →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Class Schedule Section */}
        <section id="classes" className="section">
          <div className="section-head">
            <div>
              <p className="eyebrow">03 / BOOK YOUR SLOT</p>
              <h2>
                CLASS <em>SCHEDULE</em>
              </h2>
            </div>
          </div>

          <div className="filters">
            <input
              aria-label="Search classes"
              placeholder="Search class or trainer..."
              value={classQuery}
              onChange={(e) => setClassQuery(e.target.value)}
            />
            {classCategories.map((cat) => (
              <button
                key={cat}
                className={classCategory === cat ? "active" : ""}
                onClick={() => setClassCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="class-list">
            {filteredClasses.map((c) => {
              const spotsLeft = c.capacity - c.booked;
              const isBooked = bookedClassIds.includes(c.id);

              return (
                <article className="class-row" key={c.id}>
                  <div className="class-time">
                    <b>{c.time}</b>
                    <small>{c.duration}</small>
                  </div>

                  <div className="class-title">
                    <span>
                      {c.category} · {c.level}
                    </span>
                    <h3>{c.title}</h3>
                    <p>Coach {c.coach}</p>
                  </div>

                  <div className="capacity">
                    <small>{spotsLeft} SPOTS LEFT</small>
                    <div>
                      <i style={{ width: `${(c.booked / c.capacity) * 100}%` }} />
                    </div>
                  </div>

                  <button
                    className={isBooked ? "booked" : "book"}
                    onClick={() => handleBookClass(c.id)}
                  >
                    {isBooked ? "CANCEL" : spotsLeft === 0 ? "JOIN WAITLIST" : "BOOK NOW"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* Membership Plans Section */}
        <section id="membership" className="section membership">
          <div className="section-head">
            <div>
              <p className="eyebrow">04 / COMMIT</p>
              <h2>
                MEMBERSHIP <em>BUILT AROUND YOU</em>
              </h2>
            </div>
          </div>

          <div className="plans">
            {plans.map((plan, index) => {
              const isFeatured = index === 1;

              return (
                <article
                  key={plan.name}
                  className={isFeatured ? "plan featured" : "plan"}
                >
                  {isFeatured && <label>MOST POPULAR</label>}
                  <p>{plan.name}</p>
                  <h3>
                    {plan.price}
                    <small>/ MONTH</small>
                  </h3>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>✓ {feature}</li>
                    ))}
                  </ul>
                  <button>
                    CHOOSE PLAN ↗
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* Trainers Section */}
        <section id="trainers" className="section trainer-section">
          <div className="split">
            <div>
              <p className="eyebrow">05 / COACHING</p>
              <h2>
                MEET THE
                <br />
                <em>COACHES</em>
              </h2>
              <p className="lead">
                Experienced coaches who care about form, progression and sustainable results.
              </p>
              <a className="btn" href="#contact">
                BOOK A TRAINER
              </a>
            </div>

            <div className="trainer-grid">
              {trainers.map((trainer) => (
                <div className="trainer" key={trainer.name}>
                  <div className={`trainer-img ${trainer.imageClass}`} />
                  <span>{trainer.role}</span>
                  <h3>{trainer.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about">
          <div>
            <p className="eyebrow">06 / WHY CAMPUSFIT</p>
            <h2>
              MORE THAN
              <br />
              <em>A GYM.</em>
            </h2>
          </div>
          <div className="about-copy">
            <p>
              CampusFit brings training, nutrition and community into one focused system. Whether
              you're starting out or chasing your next personal best, every part of the experience
              is designed to keep you moving forward.
            </p>
            <div className="feature-list">
              <span>01 / PROFESSIONAL EQUIPMENT</span>
              <span>02 / EXPERT TRAINERS</span>
              <span>03 / NUTRITION SUPPORT</span>
              <span>04 / PROGRESS TRACKING</span>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact">
          <div>
            <p className="eyebrow">07 / LET'S TALK</p>
            <h2>
              READY TO
              <br />
              <em>START?</em>
            </h2>
          </div>

          <form onSubmit={handleContactSubmit}>
            <input required placeholder="YOUR NAME" />
            <input required type="email" placeholder="EMAIL ADDRESS" />
            <textarea placeholder="WHAT ARE YOU WORKING TOWARDS?" />
            <button type="submit" className="btn">
              SEND MESSAGE ↗
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="brand">
          <span>CF</span> CAMPUS<span>FIT</span>
        </div>
        <p>Train hard. Recover smart. Keep going.</p>
        <div>
          <a href="#home">Instagram</a>
          <a href="#home">YouTube</a>
          <a href="#home">LinkedIn</a>
        </div>
        <small>© 2026 CampusFit. Student project.</small>
      </footer>
    </div>
  );
}

export default App;
