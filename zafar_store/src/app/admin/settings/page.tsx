"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Save, Loader2, Check, X } from 'lucide-react';

export default function AdminSettingsPage() {
  const [form, setForm] = useState({ title1:'', title2:'', title3:'', background_image:'', metadata_top_left:'', metadata_top_center:'', metadata_top_right:'', side_text_left:'', side_text_right:'', description_chapter:'', description_text:'' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{message:string;type:'success'|'error'}|null>(null);

  const showToast = (message:string, type:'success'|'error'='success') => { setToast({message,type}); setTimeout(()=>setToast(null),3000); };

  useEffect(()=>{
    async function fetch(){
      const {data} = await supabase.from('settings').select('*').eq('id','hero').single();
      if(data) setForm({ title1:data.title1||'', title2:data.title2||'', title3:data.title3||'', background_image:data.background_image||'', metadata_top_left:data.metadata_top_left||'', metadata_top_center:data.metadata_top_center||'', metadata_top_right:data.metadata_top_right||'', side_text_left:data.side_text_left||'', side_text_right:data.side_text_right||'', description_chapter:data.description_chapter||'', description_text:data.description_text||'' });
      setLoading(false);
    }
    fetch();
  },[]);

  const handleSave = async () => {
    setSaving(true);
    const {error} = await supabase.from('settings').upsert({id:'hero',...form});
    if(error) showToast(`Erreur: ${error.message}`,'error');
    else showToast('Paramètres sauvegardés !');
    setSaving(false);
  };

  const inp = "w-full bg-gray-50 border border-gray-200 text-zinc-900 text-sm px-3 py-2.5 rounded-lg focus:outline-none focus:border-zinc-400 transition-colors placeholder:text-gray-400";
  const lbl = "block text-[10px] font-mono tracking-widest text-gray-400 mb-1.5 uppercase";

  const Section = ({title,children}:{title:string;children:React.ReactNode}) => (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-6 space-y-4">
      <h2 className="font-semibold text-zinc-900 text-sm border-b border-gray-100 pb-3">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl">
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-mono tracking-wider shadow-lg ${toast.type==='success'?'bg-emerald-500 text-white':'bg-red-500 text-white'}`}>
          {toast.type==='success'?<Check className="w-4 h-4"/>:<X className="w-4 h-4"/>} {toast.message}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Paramètres</h1>
          <p className="text-gray-400 text-sm mt-0.5">Hero section & configuration du site</p>
        </div>
        <button onClick={handleSave} disabled={saving||loading} className="flex items-center gap-2 bg-zinc-900 text-white text-xs font-mono tracking-widest px-4 py-2.5 rounded-lg hover:bg-zinc-700 transition-colors disabled:opacity-50">
          {saving?<Loader2 className="w-4 h-4 animate-spin"/>:<Save className="w-4 h-4"/>}
          {saving?'Enregistrement...':'Sauvegarder'}
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 text-gray-300 animate-spin" /></div>
      ):(
        <>
          <Section title="Titres du Hero">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['title1','title2','title3'] as const).map((key,i)=>(
                <div key={key}><label className={lbl}>Ligne {i+1}</label><input className={inp} placeholder={['Quiet','riot.','tailored.'][i]} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} /></div>
              ))}
            </div>
          </Section>

          <Section title="Image de fond du Hero">
            <div><label className={lbl}>URL de l'image</label><input className={inp} placeholder="https://..." value={form.background_image} onChange={e=>setForm({...form,background_image:e.target.value})}/></div>
            {form.background_image && (
              <div className="relative mt-2 rounded-xl overflow-hidden h-48 bg-gray-100">
                <img src={form.background_image} alt="Preview" className="w-full h-full object-cover opacity-80"/>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex flex-col justify-center pl-8">
                  <span className="font-serif italic text-white text-2xl leading-tight">{form.title1||'Quiet'}</span>
                  <span className="font-serif italic text-amber-200 text-2xl leading-tight">{form.title2||'riot.'}</span>
                  <span className="font-serif italic text-white text-2xl leading-tight">{form.title3||'tailored.'}</span>
                </div>
                <span className="absolute top-3 right-3 bg-emerald-500 text-white text-[9px] font-mono tracking-widest px-2 py-1 rounded-full">APERÇU LIVE</span>
              </div>
            )}
          </Section>

          <Section title="Barre de métadonnées">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[{key:'metadata_top_left',label:'Gauche',ph:'FW26 / 2026'},{key:'metadata_top_center',label:'Centre',ph:'| NEW DROP |'},{key:'metadata_top_right',label:'Droite',ph:'EU • NY • TYO'}].map(({key,label,ph})=>(
                <div key={key}><label className={lbl}>{label}</label><input className={inp} placeholder={ph} value={(form as any)[key]} onChange={e=>setForm({...form,[key]:e.target.value})}/></div>
              ))}
            </div>
          </Section>

          <Section title="Textes secondaires">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[{key:'side_text_left',label:'Texte gauche',ph:'FW26 — VOL. 04'},{key:'side_text_right',label:'Texte droite',ph:'MARRAKECH — 2026'},{key:'description_chapter',label:'Chapitre',ph:'— CHAPTER FOUR'},{key:'description_text',label:'Description',ph:'HEAVYWEIGHT KNITS...'}].map(({key,label,ph})=>(
                <div key={key}><label className={lbl}>{label}</label><input className={inp} placeholder={ph} value={(form as any)[key]} onChange={e=>setForm({...form,[key]:e.target.value})}/></div>
              ))}
            </div>
          </Section>
        </>
      )}
    </div>
  );
}
