function characterClick(e: React.MouseEvent<HTMLImageElement>) {
  e.preventDefault();
  // Left click - edit character
  if (e.button === 0) {
    console.log("Left click");
    // Right click - enable / disable character
  } else if (e.button === 2) {
    console.log("Right click");
  }
}

export default characterClick;
