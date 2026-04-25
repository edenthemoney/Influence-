import Link from 'next/link';
import { CheckCircle, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Payment <span className="gradient-text">Successful!</span>
          </h1>
          <p className="text-xl text-white/60 mb-8">
            Your campaign booking has been confirmed. We'll be in touch shortly with next steps.
          </p>
        </div>

        <div className="bg-zinc-900 border border-white/10 p-8 rounded-none mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">What Happens Next?</h2>
          <ul className="text-left space-y-4 text-white/80">
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 gold-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-black text-xs font-bold">1</span>
              </div>
              <span>You'll receive a confirmation email with your booking details</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 gold-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-black text-xs font-bold">2</span>
              </div>
              <span>Our team will connect you with your selected influencer</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 gold-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-black text-xs font-bold">3</span>
              </div>
              <span>You'll provide your campaign brief and creative direction</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-6 h-6 gold-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-black text-xs font-bold">4</span>
              </div>
              <span>Content creation begins and deliverables are sent for approval</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/marketplace">
            <Button className="px-8 py-4 gold-gradient text-black font-bold tracking-wider uppercase">
              Browse Talent
            </Button>
          </Link>
          <Link href="/pricing">
            <Button className="px-8 py-4 bg-transparent border-2 border-white/20 text-white font-bold tracking-wider uppercase hover:border-yellow-500 hover:text-yellow-500">
              View Packages
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center justify-center space-x-2 text-white/60">
            <Crown className="h-5 w-5 text-yellow-500" />
            <span className="text-sm">Need help? Contact us at support@influence.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
