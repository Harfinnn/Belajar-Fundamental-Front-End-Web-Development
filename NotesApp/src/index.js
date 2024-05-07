customElements.define('my-header', class extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
      header {
        background: white;
           padding: 16px;
           color: black;
           display: grid;
           grid-template-columns: 1fr auto;
           align-items: center;
       }
       
       nav a {
           text-decoration: none;
           padding: 8px 16px;
           margin: 0 8px;
           border-radius: 8px;
           background-color: #5F30E2;
           color: white;
           font-weight: bold;
           transition: background-color 0.3s ease;
           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
         }
      </style>
     
      <header>
        <h1>Note List</h1>
        <nav>
          <a href="#add-note">Tambahkan Note</a>
          <a href="#list-node">List Note</a>
        </nav>
      </header>
    `;
    shadowRoot.appendChild(template.content.cloneNode(true));
  }
});

// Definisi custom element 'add-note'
customElements.define('add-note', class extends HTMLElement {
    constructor() {
      super();
  
      const shadowRoot = this.attachShadow({ mode: 'open' });
  
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          input[type=text], input[type=date], textarea {
            font-family: Raleway, sans-serif;
            background: #F5F1FF;
            border: 2px solid #9475EA;
            border-radius: 8px;
            padding: 16px;
            box-sizing: border-box;
            margin-bottom: 8px;
            font-size: 24px;
          }
  
          textarea {
            resize: vertical;
          }
  
          .btn-submit {
            width: fit-content;
            font-family: Raleway, sans-serif;
            border-radius: 16px;
            padding: 12px 24px;
            border: 2px solid #5F30E2;
            color: black;
            font-size: 24px;
            margin-top: auto;
            align-self: flex-end;
            cursor: pointer;
          }
  
          .btn-submit:hover {
            background: #5F30E2;
            color: white;
          }
  
          .btn-submit:focus {
            outline: none;
          }
  
          form {
            display: grid;
            padding: 16px;
            grid-template-rows: repeat(auto-fill, minmax(50px, 1fr));
            border-radius: 16px;
          }
  
          .form-group {
            display: flex;
            flex-direction: column;
          }
  
          .form-group label {
            margin-bottom: 4px;
            font-size: 18px;
            font-weight: lighter;
          }
        </style>
        <form class="form" id="form">
          <div class="form-group form-title">
            <label for="note-title">Title</label>
            <input type="text" id="note-title" name="title" required>
          </div>
          <div class="form-group form-title">
            <label for="note-body">Masukan Pesan disini</label>
            <textarea id="note-body" name="pesan" required></textarea>
          </div>    
          <input type="submit" value="Submit" name="Submit" class="btn-submit">
        </form>
      `;
      
      shadowRoot.appendChild(template.content.cloneNode(true));
      shadowRoot.querySelector('#form').addEventListener('submit', event => {
        event.preventDefault();
        const title = shadowRoot.querySelector('#note-title').value;
        const body = shadowRoot.querySelector('#note-body').value;
        document.querySelector('list-note').addNoteToList(title, body);

      
      shadowRoot.querySelector('#note-title').value = '';
      shadowRoot.querySelector('#note-body').value = '';
      });
    }
  });

  // Definisi custom element 'list-note'
  customElements.define('list-note', class extends HTMLElement {
    constructor() {
      super();

      this.notesData = JSON.parse(localStorage.getItem('notes')) || [
          {
            id: 'notes-jT-jjsyz61J8XKiI',
            title: 'Welcome to Notes, Dimas!',
            body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
            createdAt: '2022-07-28T10:03:12.594Z',
            archived: false,
          },
          {
            id: 'notes-aB-cdefg12345',
            title: 'Meeting Agenda',
            body: 'Discuss project updates and assign tasks for the upcoming week.',
            createdAt: '2022-08-05T15:30:00.000Z',
            archived: false,
          },
          {
            id: 'notes-XyZ-789012345',
            title: 'Shopping List',
            body: 'Milk, eggs, bread, fruits, and vegetables.',
            createdAt: '2022-08-10T08:45:23.120Z',
            archived: false,
          },
          {
            id: 'notes-1a-2b3c4d5e6f',
            title: 'Personal Goals',
            body: 'Read two books per month, exercise three times a week, learn a new language.',
            createdAt: '2022-08-15T18:12:55.789Z',
            archived: false,
          },
          {
            id: 'notes-LMN-456789',
            title: 'Recipe: Spaghetti Bolognese',
            body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
            createdAt: '2022-08-20T12:30:40.200Z',
            archived: false,
          },
          {
            id: 'notes-QwErTyUiOp',
            title: 'Workout Routine',
            body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
            createdAt: '2022-08-25T09:15:17.890Z',
            archived: false,
          },
          {
            id: 'notes-abcdef-987654',
            title: 'Book Recommendations',
            body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
            createdAt: '2022-09-01T14:20:05.321Z',
            archived: false,
          },
          {
            id: 'notes-zyxwv-54321',
            title: 'Daily Reflections',
            body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
            createdAt: '2022-09-07T20:40:30.150Z',
            archived: false,
          },
          {
            id: 'notes-poiuyt-987654',
            title: 'Travel Bucket List',
            body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
            createdAt: '2022-09-15T11:55:44.678Z',
            archived: false,
          },
          {
            id: 'notes-asdfgh-123456',
            title: 'Coding Projects',
            body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
            createdAt: '2022-09-20T17:10:12.987Z',
            archived: false,
          },
          {
            id: 'notes-5678-abcd-efgh',
            title: 'Project Deadline',
            body: 'Complete project tasks by the deadline on October 1st.',
            createdAt: '2022-09-28T14:00:00.000Z',
            archived: false,
          },
          {
            id: 'notes-9876-wxyz-1234',
            title: 'Health Checkup',
            body: 'Schedule a routine health checkup with the doctor.',
            createdAt: '2022-10-05T09:30:45.600Z',
            archived: false,
          },
          {
            id: 'notes-qwerty-8765-4321',
            title: 'Financial Goals',
            body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
            createdAt: '2022-10-12T12:15:30.890Z',
            archived: false,
          },
          {
            id: 'notes-98765-54321-12345',
            title: 'Holiday Plans',
            body: 'Research and plan for the upcoming holiday destination.',
            createdAt: '2022-10-20T16:45:00.000Z',
            archived: false,
          },
          {
            id: 'notes-1234-abcd-5678',
            title: 'Language Learning',
            body: 'Practice Spanish vocabulary for 30 minutes every day.',
            createdAt: '2022-10-28T08:00:20.120Z',
            archived: false,
          },];
      this.render();
      this.loadNotes();
    }
  
    connectedCallback() {
      this.render();
      this.loadNotes();
    }

    async loadNotes() {
      this.showLoadingIndicator();
      try {
        const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
        const data = await response.json();
        this.notesData = data.data;
        this.render();
        
      } catch (error) {
        console.error("Error loading notes:", error);
        this.hideLoadingIndicator();
      }
    }
  
    render() {
      this.innerHTML = '';
      const notesContainer = document.createElement('div');
      notesContainer.classList.add('note-list');
  
      this.notesData.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
          <h3>ID : ${note.id}<h3>
          <h3>Judul : ${note.title}</h3>
          <p>${note.body}</p>
          <p>Created At: ${note.createdAt}</p>
          <button class="delete-note" data-id="${note.id}">Delete</button>
        `;

          const deleteButton = noteElement.querySelector('.delete-note');
          deleteButton.addEventListener('click', () => {
            this.deleteNoteFromList(note.id);
        });

        notesContainer.appendChild(noteElement);
      });
  
      this.appendChild(notesContainer);
    }

    showLoadingIndicator() {
      const loadingIndicator = document.createElement("div");
      loadingIndicator.classList.add("loading-indicator");
      loadingIndicator.innerHTML = '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>';

      this.appendChild(loadingIndicator);
    }
  
    hideLoadingIndicator() {
      const loadingIndicator = this.querySelector(".loading-indicator");
      if (loadingIndicator) {
        loadingIndicator.remove();
      }
    }
  
    async addNoteToList(title, body) {
      this.showLoadingIndicator();
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
    
        const response = await fetch("https://notes-api.dicoding.dev/v2/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            body: body,
          }),
        });
    
        const data = await response.json();
        this.notesData.unshift(data.data);
        this.saveData(); // Menyimpan data lokal setelah menambahkan catatan baru
        this.render();
        this.hideLoadingIndicator();
        alert("sukses menambahkan catatan");
      } catch (error) {
        console.error("Error adding note:", error);
        this.hideLoadingIndicator();
        alert("Gagal menambahkan catatan");
      }
    }
    
  
    async deleteNoteFromList(id) {
      const confirmation = confirm("Ingin menghapus catatan?");
      if (confirmation) {
        this.showLoadingIndicator();
        try {
          // Menunggu selama 2 detik untuk menunjukkan indikator loading (simulasi)
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          await fetch(`https://notes-api.dicoding.dev/v2/notes/${id}`, {
            method: "DELETE",
          });
    
          // Menghapus catatan dari data lokal
          this.notesData = this.notesData.filter((note) => note.id !== id);
          this.saveData(); // Menyimpan data lokal setelah menghapus catatan
          this.render();
        } catch (error) {
          console.error("Error deleting note:", error);
          this.hideLoadingIndicator();
          alert("Gagal menghapus catatan");
        }
      }
    }
    
  
    saveData() {
      localStorage.setItem('notes', JSON.stringify(this.notesData));
    }
  });