class Profile {
    constructor(name, karma, email) {
      this.name = name; // String: Name of the user
      this.karma = karma; // Int: Karma of the user
      this.email = email; // String: Email of the user
    }
  
    // Debug function for the sake of seeing values directly via console.
    displayProfile() {
      console.log(`Name: ${this.name}`);
      console.log(`Karma: ${this.karma}`);
      console.log(`Email: ${this.email}`);
    }
  }
  
  class Post {
    constructor(author, time, location, category, attendees, description) {
      this.author = author; // String: Name of the author, derived from Profile.name
      this.time = time; // String: Time of the post
      this.location = location; // String: Location of the post
      this.category = category; // String or int: Category or Course of the post
      this.attendees = attendees; // Int or string: Headcount or attendees
      this.description = description; // String: Description of the post
    }
  
    // Debug function for the sake of seeing values directly via console.
    displayPost() {
      console.log(`Author: ${this.author}`);
      console.log(`Time: ${this.time}`);
      console.log(`Location: ${this.location}`);
      console.log(`Category: ${this.category}`);
      console.log(`Attendees: ${this.attendees}`);
      console.log(`Description: ${this.description}`);
    }
  }
  
  
  // here's mock information to test out.
  // mock profile
  const mockProfile = new Profile('John Doe', 420, 'john.doe@example.com');
  
  // mock event
  const mockPost = new Post(
    mockProfile.name,
    '2024-04-14T10:00:00Z',
    'Worcester Hall',
    'Get apple juice',
    4,
    'mmmmmm yummy apple juice'
  );
  