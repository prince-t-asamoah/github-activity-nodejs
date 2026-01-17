function main() {
  const username = process.argv[2];

  if (!username) {
    console.log("Please provide github username to view activity");
    return;
  }
}

// Run main application
main();
