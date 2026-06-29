/**
 * Glitches a string by randomly replacing characters with digital noise symbols.
 * @param {string} text - The original string.
 * @param {number} intensity - Number of characters to replace (0.0 to 1.0)
 * @returns {string}
 */
export function glitchTextString(text, intensity = 0.15) {
  const glitchChars = "$@#%&?*+=_[]{}|<>^0123456789";
  const textArr = text.split("");
  const numToReplace = Math.max(1, Math.floor(textArr.length * intensity));

  for (let i = 0; i < numToReplace; i++) {
    const randomIndex = Math.floor(Math.random() * textArr.length);
    if (textArr[randomIndex] !== " ") {
      textArr[randomIndex] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
    }
  }

  return textArr.join("");
}

/**
 * Calculates a basic distance-based repel vector for physics-based components.
 * @param {number} x - Target x coord
 * @param {number} y - Target y coord
 * @param {number} mouseX - Mouse x coord
 * @param {number} mouseY - Mouse y coord
 * @param {number} radius - Active repulsion radius
 * @returns {{dx: number, dy: number, distance: number}}
 */
export function calculateRepel(x, y, mouseX, mouseY, radius = 100) {
  const dx = x - mouseX;
  const dy = y - mouseY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < radius) {
    const force = (radius - distance) / radius; // 0 to 1
    return {
      dx: (dx / distance) * force * 30, // Repel magnitude
      dy: (dy / distance) * force * 30,
      distance
    };
  }
  
  return { dx: 0, dy: 0, distance };
}
