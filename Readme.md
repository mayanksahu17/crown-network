Thanks for the clarity — here's a **simple breakdown** of the entire logic for the **Crown Network** project, tailored for smooth implementation and development in 7 days:

---

### 🧠 Core Concepts:

#### 1. **Binary Tree Structure**

* Each user can refer only **2 users max** — one on the **left** and one on the **right**.
* Every referral must be **direct**. No team or indirect referrals count.

---

### 💵 Package Tiers:

| Tier   | Plans                                 | Binary % |
| ------ | ------------------------------------- | -------- |
| Tier 1 | \$10, \$25, \$50, \$100               | 65%      |
| Tier 2 | \$250, \$500, \$1000, \$2000          | 70%      |
| Tier 3 | \$2500, \$5000, \$10000, \$15000      | 75%      |
| Tier 4 | \$20000, \$25000, \$35000, \$50000    | 80%      |
| Tier 5 | \$60000, \$100000, \$200000, \$500000 | 90%      |

---

### 🔁 Daily ROI:

* **2% per day** of package value.
* **Only for 180 days**.
* **ROI starts** the day user activates a package.
* **If capital is withdrawn early**, ROI accrual **stops immediately**, but the user **can only withdraw ROI after 180 days**.

---

### 🧾 Capital Withdrawal Rules:

| Case        | Referral Timing                                   | Matching Referrals (L+R) | Capital Withdraw? | Binary Income? |
| ----------- | ------------------------------------------------- | ------------------------ | ----------------- | -------------- |
| ✅ Case 1    | A invests first                                   | B = \$100, C = \$100     | ✅ Allowed         | ✅ \$65         |
| ❌ Case 2    | A invests after B+C                               | B = \$100, C = \$100     | ❌ Not allowed yet | ✅ \$65         |
| ✅ Case 2(b) | A later gets 2 more same-package activations      | ✅ Allowed                | ✅ \$65            |                |
| ❌ Case 3    | A is inactive                                     | B = \$100, C = \$100     | ❌ Not allowed     | ✅ \$65         |
| ❌ Case 4    | Same side referrals                               | B = 2×\$100, C inactive  | ❌ Not allowed     | ❌ No income    |
| ❌ Case 5    | Package mismatch                                  | B = \$100, C = 2×\$50    | ❌ Not allowed     | ❌ No income    |
| ❌ Case 6    | Higher A package                                  | A = \$500, B+C = \$100   | ❌ Not allowed     | ✅ \$65         |
| ❌ Case 7    | B+C inactive                                      | ❌ Not allowed            | ❌ No income       | ✅ \$2/day ROI  |
| ✅ Case 8    | Left = \$200, Right = \$100 (both contain \$100)  | ✅ Allowed                | ✅ \$65            |                |
| ❌ Case 9    | A activates after B+C                             | ❌ Not allowed            | ✅ \$65            |                |
| ✅ Case 10   | A = \$100, B+C = \$100 & \$10, D+E = \$10 & \$100 | ✅ Allowed                | ✅ \$65 + \$6.5    |                |

---

### ⚙️ System Rules Logic

1. **Binary Matching Rule**: Binary triggers only when both left and right referrals activate the **same package**.
2. **Referral Only**: Only direct referral activity counts for binary and withdrawal conditions.
3. **Mismatch = No Bonus**: If package values are different (e.g., \$100 vs \$50×2), no binary triggers.
4. **Capital Unlocking Rule**:

   * If user activates first → capital withdraw allowed on **first binary match**.
   * If user activates later → must get another binary match (new or re-activation) to unlock capital.
5. **Same-Side Rule**: Two packages on the same side → **no binary income**.
6. **ROI Suspension**: Capital withdrawal stops ROI; but accrued ROI (till that date) will unlock after 180 days.
7. **ROI Delay**: ROI is **not instantly claimable** — only after full 180 days.

---

### 🧩 Developer-Friendly Tips:

#### Models You'll Likely Need:

* **User**: ID, referralCode, referredBy, leftUser, rightUser, package, activationDate, ROIearned, ROIwithdrawn, capitalWithdrawn
* **Package**: ID, amount, dailyROI, binaryPercentage
* **ReferralActivity**: userID, referralID, side, package, date
* **BinaryHistory**: userID, leftReferral, rightReferral, amount, status

#### Key Triggers:

* On user activation:

  * Check referral tree (left/right).
  * Check if both sides are active with same package → compute binary income.
  * Decide on capital withdrawal option based on activation order.
  * Start ROI clock.

* On referral activity:

  * Reevaluate binary eligibility for uplines.
  * Check for matching package.
  * Check if it unlocks capital for uplines who delayed their activation.

* On withdrawal request:

  * Capital: Allowed only if eligible.
  * ROI: Only after 180 days (even if capital withdrawn early).

---

Let me know if you want:

* Schema designs
* Logic flows in code format
* Database structure
* Admin panel logic
* Complete day-wise development plan for 7 days

Ready to dive deeper into implementation whenever you're ready.
