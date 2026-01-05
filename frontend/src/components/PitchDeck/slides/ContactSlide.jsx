import React from 'react';
import { Mail, Globe, MessageSquare, ArrowRight, Handshake } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';

const ContactSlide = ({ data }) => {
  return (
    <div className="min-h-screen pt-24 pb-32 px-8 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Handshake className="w-10 h-10 text-white" />
          </div>
          <p className="text-teal-600 font-medium mb-3 tracking-wide uppercase text-sm">
            {data.subtitle}
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            {data.title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {data.content.callToAction}
          </p>
        </div>
        
        <Card className="border-slate-200 bg-white mb-12">
          <CardContent className="p-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Discussion Topics</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {data.content.discussionTopics.map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 text-teal-500 shrink-0" />
                  <span className="text-slate-700">{topic}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <a
            href={data.content.contact.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="border-slate-200 bg-white hover:border-teal-300 hover:shadow-lg transition-all h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <Globe className="w-7 h-7 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Website</p>
                  <p className="text-slate-800 font-medium">
                    {data.content.contact.website.replace('https://', '')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </a>
          
          <a
            href={`mailto:${data.content.contact.email}`}
            className="block"
          >
            <Card className="border-slate-200 bg-white hover:border-teal-300 hover:shadow-lg transition-all h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                  <Mail className="w-7 h-7 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="text-slate-800 font-medium">
                    {data.content.contact.email}
                  </p>
                </div>
              </CardContent>
            </Card>
          </a>
        </div>
        
        <div className="text-center p-8 bg-gradient-to-br from-slate-50 to-teal-50 rounded-2xl border border-slate-200">
          <p className="text-lg text-slate-700 leading-relaxed">
            {data.content.closing}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactSlide;
