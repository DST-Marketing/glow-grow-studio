const byId = (id) => document.getElementById(id);
const list = (items) => "<ul>" + items.map((item) => "<li>" + item + "</li>").join("") + "</ul>";
const card = (title, summary, points, pills = []) => {
  const pillMarkup = pills.length
    ? '<div class="result-grid">' + pills.map(([key, value]) => '<div class="result-pill"><strong>' + key + '</strong>' + value + '</div>').join("") + '</div>'
    : "";
  return "<h4>" + title + "</h4><p>" + summary + "</p>" + list(points) + pillMarkup;
};

const data = {
  skin: {
    balanced: ["Balanced skin wants consistency more than complexity.", ["Keep cleanser gentle and SPF daily.", "Add one treatment at a time so you can read your skin.", "Use light hydration before makeup for a smooth finish."]],
    combination: ["Combination skin needs zones, not one heavy answer.", ["Use light hydration across the face.", "Keep richer cream only where skin feels tight.", "Use shine control only on the T-zone."]],
    dry: ["Dry skin needs water plus seal, not harsh exfoliation.", ["Use creamy cleanse or morning rinse only.", "Layer humectant serum under barrier cream.", "Keep acids to once weekly until flaking settles."]],
    oily: ["Oily skin still needs hydration to avoid rebound shine.", ["Choose gel textures and non-heavy SPF.", "Use niacinamide or BHA slowly for pores.", "Blot or powder after skincare has fully set."]],
    sensitive: ["Sensitive skin needs a short, boring routine first.", ["Pause fragrance and strong actives.", "Use cleanser, calming serum, barrier cream, mineral SPF.", "Patch test anything new for two nights."]],
    acne: ["Breakout-prone skin needs calm consistency and less panic switching.", ["Use a gentle cleanser and light moisturizer.", "Introduce BHA or benzoyl peroxide slowly, not all at once.", "Keep towels, sweat, and post-workout cleanse routines clean and simple."]],
  },
  product: {
    glow: ["Glow lane", ["Vitamin C or gentle exfoliation.", "Sunscreen consistency is the real brightening step.", "Review by: radiance, irritation, and makeup layering."]],
    calm: ["Calm lane", ["Centella, oat, ceramides, and fragrance-free formulas.", "Avoid stacking actives while redness is high.", "Review by: sting level, recovery speed, and comfort."]],
    energy: ["Energy lane", ["Electrolytes, protein-forward snacks, and a movement cue.", "Choose products that reduce friction, not add tasks.", "Review by: ease, repeatability, and afternoon energy."]],
    sleep: ["Sleep lane", ["Magnesium ritual, screen boundary, and a fixed wind-down scent.", "Keep skincare slow and sensory at night.", "Review by: sleep latency, calm, and next-morning feel."]],
    recovery: ["Recovery lane", ["Protein, hydration, magnesium, and cooling body care.", "Use products that help you reset after HIIT or Badminton.", "Review by: soreness, energy, digestion, and repeatability."]],
    confidence: ["Confidence lane", ["Choose one visible glow product and one wellness support.", "Keep the routine easy enough to repeat before club days.", "Review by: mood lift, comfort, and how ready you feel to show up."]],
  },
  mood: {
    tired: ["Protect energy", ["Start with water and a warm rinse.", "Do three stretches before skincare.", "Close with rich moisturizer and an earlier bedtime cue."]],
    anxious: ["Regulate first", ["Breathe for two minutes before deciding anything.", "Tidy one visible surface.", "Use calming skincare and write one line only."]],
    confident: ["Use the spark", ["Pick one bold beauty detail.", "Do a focused work block while energy is high.", "Share one idea or invite one person in."]],
    unfocused: ["Reduce the field", ["Drink water, set a short timer, and choose one task.", "Use a simple playlist as a start cue.", "End by writing the next visible step."]],
    overwhelmed: ["Make life smaller for ten minutes", ["Put your phone down and drink water first.", "Choose one body cue: stretch, shower, or slow walk.", "Text one person or book one session instead of solving everything alone."]],
    social: ["Turn connection into momentum", ["Choose a fresh routine that makes you feel ready.", "Message someone about the next Founders Club slot.", "Let movement be the easy reason to reconnect."]],
  },
};

document.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-tool]");
  if (!button) return;

  const tool = button.dataset.tool;

  if (tool === "skin") {
    const type = byId("skinInput").value;
    const sensitivity = Number(byId("skinSensitivity").value);
    const goal = byId("skinGoal").value;
    const base = data.skin[type];
    const sensitivityNote = sensitivity >= 4
      ? "High sensitivity: keep the next 7 days fragrance-free and low-active."
      : "Sensitivity is workable: introduce only one upgrade this week.";

    byId("skinResult").innerHTML = card(
      base[0],
      "Goal: " + goal + ". " + sensitivityNote,
      [...base[1], "Core point: skin confidence comes from repeatable basics before product chasing."],
      [["Priority", sensitivity >= 4 ? "Repair and calm" : "Maintain and refine"], ["Next check", "Reassess in 7 days"]]
    );
  }

  if (tool === "routine") {
    const moment = byId("routineInput").value;
    const time = byId("routineTime").value;
    const finish = byId("routineFinish").value;
    const steps = {
      morning: ["Cleanse or rinse", "Hydrating serum", "Moisturizer", "SPF", "Finish: " + finish],
      night: ["Cleanse", "Treatment only if skin is calm", "Barrier cream", "Lip care", "Lights-down cue"],
      event: ["Hydrate", "Depuff", "Luminous base", "Cream blush", "Soft lip and grounding breath"],
      postWorkout: ["Cool down and rinse sweat", "Gentle cleanse", "Light moisturizer", "Electrolytes or protein", "Fresh finish: " + finish],
      travel: ["Mist or rinse", "Moisturizer", "SPF if daytime", "Lip care", "Pack one emergency glow product"],
    };
    const selectedSteps = steps[moment].slice(0, Math.min(5, Number(time) === 5 ? 3 : 5));

    byId("routineResult").innerHTML = card(
      moment === "night" ? "Night routine map" : moment === "event" ? "Event-ready flow" : moment === "postWorkout" ? "Post-workout reset" : moment === "travel" ? "Travel routine map" : "Morning routine map",
      time + " minutes available. Keep the order simple and repeatable.",
      selectedSteps.concat(["Skip rule: if rushed, keep cleanse, moisture, SPF or barrier care."]),
      [["Finish", finish], ["Effort", time + " min"]]
    );
  }

  if (tool === "habits") {
    const completed = [...document.querySelectorAll(".checks input:checked")].map((item) => item.value);
    const energy = Number(byId("energyInput").value);
    const sleep = Number(byId("sleepInput").value || 0);
    const score = completed.length * 15 + energy * 6 + (sleep >= 7 ? 10 : 0);

    byId("habitResult").innerHTML = card(
      "Care score: " + Math.min(100, score) + "/100",
      completed.length ? "Logged: " + completed.join(", ") + "." : "Start with one care win; the day is still usable.",
      [
        sleep < 7 ? "Sleep is the leverage point today: lower intensity and avoid overplanning." : "Sleep is supporting you today: use the stability for one meaningful task.",
        energy <= 2 ? "Choose recovery movement, not performance movement." : "Energy is available: anchor it with water and a 10-minute reset.",
        completed.includes("Community") ? "Community is already in the rhythm today. Let connection keep the habit alive." : "Consider one small connection: message a friend or ask about the next club slot.",
        "Core point: consistency should feel kind enough to repeat.",
      ],
      [["Wins", String(completed.length)], ["Energy", energy + "/5"]]
    );
  }

  if (tool === "product") {
    const concern = byId("productInput").value;
    const preference = byId("productPreference").value;
    const budget = byId("productBudget").value;
    const base = data.product[concern];

    byId("productResult").innerHTML = card(
      base[0],
      "Preference: " + preference + ". Budget: " + budget + ".",
      [...base[1], "Buy rule: one hero product, one support product, no panic basket."],
      [["Budget", budget], ["Texture", preference]]
    );
  }

  if (tool === "planner") {
    const week = byId("plannerInput").value;
    const capacity = byId("plannerCapacity").value;
    const anchor = byId("plannerAnchor").value;
    const map = {
      steady: "Use a balanced rhythm: two movement blocks, one reset block, and one community touchpoint.",
      launch: "Protect output: prep meals, simplify beauty, block recovery after the push.",
      recovery: "Make the win smaller: sleep, low-pressure movement, and fewer decisions.",
      social: "Plan social energy: glow routine before events, quiet morning after.",
      training: "Build around training: one higher-energy movement day, one lighter recovery day, and hydration before both.",
      club: "Let Founders Club be the anchor: choose either HIIT or Badminton, then build sleep, meals, and skincare around showing up well.",
    };

    byId("plannerResult").innerHTML = card(
      "Weekly care map",
      map[week],
      [
        "Anchor habit: " + anchor + " goes on the calendar first.",
        "Capacity: " + capacity + " means your plan should have " + (capacity === "low" ? "3 non-negotiables max." : capacity === "medium" ? "one anchor per day." : "space for challenge and recovery."),
        "Boundary: choose what you will not track this week.",
      ],
      [["Week", week], ["Anchor", anchor]]
    );
  }

  if (tool === "mood") {
    const mood = byId("moodInput").value;
    const intensity = Number(byId("moodIntensity").value);
    const windowLength = byId("moodWindow").value;
    const base = data.mood[mood];

    byId("moodResult").innerHTML = card(
      base[0],
      "Intensity " + intensity + "/5 with " + windowLength + " minutes available.",
      [...base[1].slice(0, windowLength === "5" ? 2 : 3), intensity >= 4 ? "Go smaller: nervous system first, productivity second." : "Add one gentle follow-through step after the routine."],
      [["Mood", mood], ["Window", windowLength + " min"]]
    );
  }
});
