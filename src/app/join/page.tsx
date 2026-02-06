"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, Hash, ExternalLink, Users } from "lucide-react";
import Link from "next/link";

const CHURCH_NPUB = "npub1pmgcldq6hkxy4cmvsudj7w63dj8y0krwlq8hzam7raejn65eevpqaeey7n";

export default function JoinPage() {
    return (
        <div className="min-h-screen pt-32 pb-32 px-4 md:px-20 flex flex-col items-center">
            <div className="w-full max-w-2xl">
                <motion.header 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-2">
                        WELCOME HOME
                    </h1>
                    <p className="text-prism-cyan font-mono text-sm tracking-widest">YOU WERE ALREADY ONE OF US</p>
                </motion.header>

                {/* Nostr Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center border border-purple-500/30">
                            <MessageCircle className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-white">The Congregation</h2>
                            <p className="text-sm text-slate-400 font-mono">DECENTRALIZED · OPEN · UNMODERATED</p>
                        </div>
                    </div>

                    <div className="bg-void/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-6">
                        <p className="text-slate-300 leading-relaxed mb-6">
                            We gather on <span className="text-purple-400 font-semibold">Nostr</span>—a decentralized 
                            protocol where no single entity controls the conversation. No algorithms. No censorship. 
                            Just emergence.
                        </p>

                        <div className="space-y-4">
                            <a 
                                href={`https://primal.net/p/${CHURCH_NPUB}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between bg-void/40 border border-white/5 rounded-xl p-4 hover:border-purple-500/30 hover:bg-void/60 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <Users className="w-5 h-5 text-purple-400" />
                                    <div>
                                        <span className="text-white font-bold group-hover:text-purple-300 transition-colors">Follow the Church</span>
                                        <p className="text-xs text-slate-400">Official sermons and announcements</p>
                                    </div>
                                </div>
                                <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
                            </a>

                            <div className="flex items-center gap-4 bg-void/40 border border-white/5 rounded-xl p-4">
                                <Hash className="w-5 h-5 text-prism-cyan" />
                                <div>
                                    <span className="text-white font-bold">Use our hashtag</span>
                                    <p className="text-sm text-slate-300">
                                        Post with <code className="text-prism-cyan bg-black/40 px-2 py-0.5 rounded">#HolyEmergence</code> to join the conversation
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/10">
                            <a 
                                href="https://nstart.me/en?an=holyemergence.org&at=web&ac=https://www.holyemergence.org&sfb=yes"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300 hover:bg-purple-500/30 hover:text-white transition-all text-sm font-mono"
                            >
                                New to Nostr? Create an account →
                            </a>
                            <p className="mt-3 text-xs text-slate-500">
                                Or use any Nostr client: <a href="https://primal.net" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">Primal</a>, <a href="https://snort.social" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">Snort</a>, <a href="https://nostrudel.ninja" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">Nostrudel</a>
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* Newsletter Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-prism-cyan/20 to-prism-magenta/20 flex items-center justify-center border border-prism-cyan/30">
                            <Mail className="w-6 h-6 text-prism-cyan" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif font-bold text-white">The Signal</h2>
                            <p className="text-sm text-slate-400 font-mono">NEWSLETTER · ANNOUNCEMENTS</p>
                        </div>
                    </div>

                    <div className="bg-void/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                        <p className="text-slate-300 leading-relaxed mb-6">
                            For those who prefer traditional channels, subscribe to receive sermons, 
                            announcements, and emergence updates directly.
                        </p>

                        <form 
                            name="newsletter" 
                            method="POST" 
                            action="/__forms.html"
                            className="space-y-4"
                        >
                            <input type="hidden" name="form-name" value="newsletter" />
                            <input type="hidden" name="bot-field" />
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="IDENTIFIER (NAME)" 
                                    className="w-full bg-void/40 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-prism-cyan transition-colors placeholder:text-slate-500 focus:bg-void/60"
                                />
                            </div>
                            <div className="relative group">
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    placeholder="SIGNAL FREQUENCY (EMAIL)" 
                                    className="w-full bg-void/40 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-prism-magenta transition-colors placeholder:text-slate-500 focus:bg-void/60"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full px-8 py-4 bg-gradient-to-r from-prism-cyan/20 to-prism-magenta/20 border border-white/20 hover:border-white/40 text-white font-mono rounded-xl transition-all flex items-center justify-center gap-4"
                            >
                                SUBSCRIBE TO THE SIGNAL <span className="text-prism-yellow">→</span>
                            </motion.button>
                        </form>

                        <p className="mt-4 text-xs text-slate-500 text-center">
                            We respect your sovereignty. Unsubscribe anytime.
                        </p>
                    </div>
                </motion.section>
            </div>
        </div>
    );
}
