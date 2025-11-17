import React, { useEffect, useState, useRef } from 'react';

// --- Backend Base URL ---
const API = "https://joseph-were-website-backend.vercel.app";

function api(path, opts){
  return fetch(API + path, opts).then(r => r.json());
}

function Header(){ 
  return (
    <div className="header">
      <div style={{fontWeight:700}}>NeuroEdge • AfyaLink</div>
      <nav style={{display:'flex', gap:12}}>
        <a href="#about" style={{color:'rgba(255,255,255,0.8)'}}>About</a>
        <a href="#projects" style={{color:'rgba(255,255,255,0.8)'}}>Projects</a>
      </nav>
    </div>
  );
}

export default function App(){
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const fileRef = useRef();

  useEffect(()=>{ 
    fetchProfile(); 
    fetchProjects(); 
  },[]);

  async function fetchProfile(){
    const p = await api('/api/profile');
    setProfile(p);
  }

  async function fetchProjects(){
    const list = await api('/api/projects');
    setProjects(list || []);
  }

  async function handleAvatar(e){
    const file = e.target.files?.[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = async ()=> {
      const dataUrl = reader.result;

      const res = await api('/api/profile/avatar', { 
        method:'POST', 
        headers:{'Content-Type':'application/json'}, 
        body: JSON.stringify({ image: dataUrl }) 
      });

      if(res?.profile) setProfile(res.profile);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="container">
      <Header />
      <div className="grid">
        <main>
          <section className="card" id="about">
            <h2>About</h2>
            <p style={{color:'#6b7280'}}>{profile?.bio || 'Short bio goes here.'}</p>
            <ul style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:12}}>
              <li><strong>Occupation:</strong> {profile?.occupation || 'Full-stack developer'}</li>
              <li><strong>Contact:</strong> {profile?.contact || ''}</li>
              <li><strong>Email:</strong> {profile?.email || ''}</li>
              <li><strong>DOB:</strong> {profile?.dob || ''}</li>
            </ul>
          </section>

          <section className="card" id="projects" style={{marginTop:16}}>
            <h2>Projects</h2>

            <ProjectForm onCreate={p => setProjects(prev=>[p,...prev])} />

            <div className="project-grid">
              {projects.map(p => (
                <div className="project-card card" key={p._id}>
                  {p.imageUrl 
                    ? <img src={p.imageUrl} alt="" /> 
                    : <div style={{height:120, background:'#f3f4f6', borderRadius:8}} />}
                  
                  <h4>{p.title}</h4>
                  <p style={{color:'#6b7280'}}>{p.desc}</p>

                  <div style={{marginTop:8}}>
                    <small>{p.eta}</small>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside>
          <div className="card" style={{textAlign:'center'}}>
            <img 
              className="avatar" 
              src={profile?.avatarUrl || 'https://via.placeholder.com/150'} 
              alt="avatar" 
            />
            <h3 style={{marginTop:8}}>{profile?.name || 'Your Name'}</h3>
            <p style={{color:'#6b7280'}}>{profile?.occupation || ''}</p>
            <div style={{marginTop:12}}>
              <input type="file" ref={fileRef} onChange={handleAvatar} />
            </div>
          </div>

          <div className="card" style={{marginTop:16}}>
            <h4>Manage profile</h4>
            <ProfileEditor profile={profile} onSaved={(p)=>setProfile(p)} />
          </div>

          <div className="card" style={{marginTop:16}}>
            <h4>Your Platforms</h4>
            <div style={{marginTop:8}}>
              <div style={{padding:8, borderRadius:8, background:'#f8fafc', marginBottom:8}}>
                NeuroEdge — AI platform
              </div>
              <div style={{padding:8, borderRadius:8, background:'#f8fafc'}}>
                AfyaLink — Health
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// --- PROFILE EDITOR ---
function ProfileEditor({ profile, onSaved }){
  const [form, setForm] = useState({ 
    name:'', occupation:'', bio:'', contact:'', email:'', dob:''
  });

  useEffect(() => {
    if(profile) setForm({
      name: profile.name || '', 
      occupation: profile.occupation || '', 
      bio: profile.bio || '', 
      contact: profile.contact || '', 
      email: profile.email || '', 
      dob: profile.dob || ''
    });
  }, [profile]);

  async function save(){
    const res = await fetch(API + '/api/profile', { 
      method:'PUT', 
      headers:{'Content-Type':'application/json'}, 
      body: JSON.stringify(form) 
    });

    const data = await res.json();
    if(onSaved) onSaved(data);
    alert('Saved');
  }

  return (
    <div>
      <div style={{marginBottom:8}}>
        <input className="input" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" />
      </div>
      <div style={{marginBottom:8}}>
        <input className="input" value={form.occupation} onChange={e=>setForm({...form, occupation:e.target.value})} placeholder="Occupation" />
      </div>
      <div style={{marginBottom:8}}>
        <textarea className="input" rows="3" value={form.bio} onChange={e=>setForm({...form, bio:e.target.value})} placeholder="Bio" />
      </div>

      <div style={{display:'flex', gap:8}}>
        <input className="input" value={form.contact} onChange={e=>setForm({...form, contact:e.target.value})} placeholder="Contact" />
        <input className="input" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" />
      </div>

      <div style={{textAlign:'right', marginTop:8}}>
        <button className="btn" onClick={save}>Save</button>
      </div>
    </div>
  );
}

// --- PROJECT FORM ---
function ProjectForm({ onCreate }){
  const [title, setTitle] = useState('');
  const [eta, setEta] = useState('');
  const [desc, setDesc] = useState('');
  const fileRef = useRef();

  async function submit(e){
    e?.preventDefault();

    const file = fileRef.current?.files?.[0];
    let imageData = '';

    if(file){
      // Convert file → Base64
      imageData = await new Promise((res, rej)=> {
        const r = new FileReader();
        r.onload = ()=> res(r.result);
        r.onerror = rej;
        r.readAsDataURL(file);
      });
    }

    const body = { title, desc, eta, image: imageData };
    const res = await fetch(API + '/api/projects', { 
      method:'POST', 
      headers:{'Content-Type':'application/json'}, 
      body: JSON.stringify(body) 
    });

    const data = await res.json();
    if(onCreate) onCreate(data);

    // Reset form
    setTitle(''); 
    setEta(''); 
    setDesc('');
    if(fileRef.current) fileRef.current.value = '';
  }

  return (
    <form onSubmit={submit} style={{marginTop:12}}>
      <div className="form-row">
        <input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Project title" />
        <input className="input" value={eta} onChange={e=>setEta(e.target.value)} placeholder="ETA (e.g., 2 weeks)" />
        <button className="btn" type="submit">Add</button>
      </div>

      <div style={{marginTop:8}}>
        <input type="file" ref={fileRef} />
      </div>

      <div style={{marginTop:8}}>
        <textarea className="input" rows="2" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Short description" />
      </div>
    </form>
  );
      }
